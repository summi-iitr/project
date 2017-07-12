import nltk
from nltk import Tree,word_tokenize,pos_tag
import json
import os
from lxml import etree
import spacy
from spacy.en import English
from io_utils import output_data
from file_utils import absolute_path
from consts import SUBJECTS,OBJECTS,stopwords
from subverb import findSVAOs

nlp = spacy.load('en')                          
parser = English()


path = absolute_path('../../../samples1')

def text_content(node):
    result=[]
    for elem in node.getiterator():
        text=elem.text
        if text and text.strip():
            result.append(text)
    return result

def xapthget(tree,node):
    return tree.getpath(node)

def scrape():
    docmap=[]

    for filename in os.listdir(path):

        if filename.endswith('.xml') or filename.endswith('.dita') :
            fullname = os.path.join(path,filename)
            tree = etree.parse(fullname)
            root = tree.getroot()

            for child in root:
                if(child.tag == 'title'):
                    titel = ' '.join(text_content(child)).replace('\n','')
                if(child.tag != 'title'):
                        content = ' '.join(text_content(child)).replace('\n',' ')
                        content = content.encode('ascii','ignore')
                        
                        pathx = xapthget(tree,child)
                        
                        newElement={}
                        newElement["filename"] = filename
                        newElement['title']=titel
                        newElement["text"]=content
                        newElement["para"] = 'True'
                        newElement['xpath'] = pathx

                        docmap.append(newElement)


    return(docmap)

def linescrape():
    docmap = []
    for filename in os.listdir(path):
        if filename.endswith('.xml') or filename.endswith('.dita'):
            fullname = os.path.join(path,filename)
            tree = etree.parse(fullname)
            root = tree.getroot()

            for child in root:
                if(child.tag == 'title'):
                    titel = ' '.join(text_content(child)).replace('\n','')
                for tag in child:
                    content = ' '.join(text_content(tag)).replace('\n',' ')
                    content = content.encode('ascii','ignore')
                    content = content.decode('utf-8','ignore')
                    pathx = xapthget(tree,tag)
                    doc = nlp(content)
                    senlist = doc.sents
                    for sent in senlist:
                        newElement={}
                        newElement["filename"] = filename
                        newElement['title']=titel
                        newElement["text"]=sent.text
                        newElement["para"] = 'False'
                        newElement['xpath'] = pathx
                        svotrips = findSVAOs(sent)
                        a = []
                        for elem in svotrips:
                            strns = ' '.join(elem)
                            a.append(strns)

                        newElement['SVO'] = a

                        docmap.append(newElement)

    return(docmap)
    #output_data(docmap)


def parse(doc):
    grammar= r"""
        
        STP:{<VB.*><PRP.*>}
        STP:{<VB.*><DT>?<NN>}
        STP:{<VB.*><DT>?<JJ.*>*<NN.*>}
        """

    cp=nltk.RegexpParser(grammar)

    for elem in doc:
        value=elem['text']
        parse = nlp(value.decode('utf-8','ignore'))
        tagged =[]
        for word in parse:
            tupe= (word.text.encode('ascii','ignore'),word.tag_.encode('ascii','ignore'))
            tagged.append(tupe)
        result = cp.parse(tagged)

        for subtree in result.subtrees():
            if ( subtree.label() == 'STP'):
                        elem['type']='STP'
                        
            else:
                        elem['type']='DES'


    #output_data(doc)




    #output_data (doc)
 
def subobjadder (doc):

    for elem in doc:
        #if(elem["para"] == 'False'):
            sub =[]
            obj =[]
            words = elem['text']
            words = words.decode('utf-8','ignore')
            parsed = nlp(words)
            for word in parsed.noun_chunks:
                if(word.text not in stopwords):
                    if (word.root.dep_ in SUBJECTS): 
                        sub.append(word.text)
                    if(word.root.dep_ in OBJECTS ):
                        obj.append(word.text)
            elem['subject'] = sub
            elem['object'] = obj
    
    #output_data(doc)


def tok_format(tok):
    return " -".join([tok.orth_, tok.dep_])


def to_nltk_tree(node):
    if node.n_lefts + node.n_rights > 0:
        return Tree(tok_format(node), [to_nltk_tree(child) for child in node.children])
    else:
        return tok_format(node)


def treevisual (doc):
    for elem in doc:
        if(elem["para"] == 'False'):
            words = elem['text']
            words = words.decode('utf-8','ignore')
            parsed = nlp(words)
            elem['tree'] = [to_nltk_tree(sent.root) for sent in parsed.sents]

    #output_data(doc)


def typedef (doc):

    for elem in doc:
        #if(elem["para"] == 'False'):
            word = elem['text']
            word = word.decode('utf-8','ignore')
            parsed = nlp(word)
            for word in parsed:
              if(word.dep_ == 'ROOT'):
                for i in word.rights:
                    if(i.dep_ == 'attr'):
                        for j in word.lefts:
                            if(j.dep_ == 'nsubj'):
                               elem['type'] = 'DEF'
                               elem['object'] = j.text


    #output_data(doc)






#docu=scrape()
docu = linescrape()
#linescrape(docu)
parse(docu)
#docu = linescrape()
subobjadder(docu)
#treevisual(docu)

typedef(docu)

if __name__ == '__main__':
    output_data(docu)
#clearparse(doc)
