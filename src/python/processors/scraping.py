import nltk
from nltk import word_tokenize,pos_tag
import json
import os
from lxml import etree
from io_utils import output_data
from file_utils import absolute_path
path = absolute_path('../../../samples')

def text_content(node):
    result=[]
    for elem in node.getiterator():
        text=elem.text
        if text and text.strip():
            result.append(text)
    return result

def scrape():
    docmap=[]

    for filename in os.listdir(path):
        if not filename.endswith('.xml'):continue
        fullname = os.path.join(path,filename)
        tree = etree.parse(fullname)
        root = tree.getroot()

        for child in root:
            if(child.tag != 'title'):
                newElement={}
                newElement["filename"] = filename
                #newElement['type']=child.tag
                newElement["text"]=' '.join(text_content(child)).replace('\n',' ')

                docmap.append(newElement)


    return docmap

def parse(doc):
    grammar= r"""
        DEF:{<DT>?<NN.*><VB.*><DT>}
        DEF:{<JJ><NN.*><VB.*>}
        STP:{<VB.*><PRP.*>}
        STP:{<VB.*><DT><NN>}
        """

    cp=nltk.RegexpParser(grammar)

    for elem in doc:
        value=elem['text']
        tokenized = word_tokenize(value)
        tagged = pos_tag(tokenized)
        result = cp.parse(tagged)

        for subtree in result.subtrees():
            if ( subtree.label() == 'DEF'):
                elem['type']='DEF'
                lis= subtree.leaves()
                for item in lis:
                    if (item[1]=='NN'):
                        elem['object']=item[0]
        
            elif ( subtree.label() == 'STP'):
                        elem['type']='STP'
            else:
                        elem['type']='DES'


    output_data(doc)


doc=scrape()
parse(doc)
