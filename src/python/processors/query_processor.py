import sys
import spacy
from spacy.en import English
from io_utils import read_input, output_data
from consts import intent , OBJECTS 
from subverb import findSVAOs

nlp = spacy.load('en')

def process(ques):
    tagged = []
    parsed = nlp(ques)
    for word in parsed:
        tupes = []
        tupes.append(word.text)
        tupes.append(word.tag_)
        tagged.append(tupes)
    return tagged

def intention(ques):
    parsed = nlp(ques)
    for items in parsed:
       if any ( [ items.tag_ == 'WRB', items.tag_ == 'WP', items.tag_ == 'WDT'] ):
           return intent[items.tag_][items.text.encode('ascii','ignore').lower()]

def types(ques):
    parsed = nlp(ques)
    que = "s"
    for item in parsed:
        if ( item.tag_ == 'WRB' and item.text.lower() == 'how' ):
            que = "STP"
        if ( item.tag_ == 'WP' and item.text.lower() == 'what' and item.head.orth_.encode('ascii') == 'is'):
            que = 'DEF' 
    
    if(que == 's'):
        que = 'DES'

    #if(parsed[0].text.lower() == "what" ):
        #que = "DE"
    return que

def nounword(ques):
    featlist = []
    parsed = nlp(ques)
    #for np in parsed :
    for np in parsed.noun_chunks :
        if  ( np.root.tag_ != "WP" ):
            featlist.append(np.text)

        #if (np.pos_ == 'NOUN' or np.pos_ == 'PROPN'):
            #if(np.tag_ != 'WP'):
                #featlist.append(np.text)

    return featlist

def verboj(ques):
    #obj = []
    feat= []
    parsed = nlp(ques)

    for word in parsed:
        if any ( [ word.tag_ == "VB" , word.tag_ == "VBN" , word.tag_ == "VBD" ] ):
             feat.append(word.text)

    for np in parsed.noun_chunks:
        if(np.root.dep_ in OBJECTS):
            feat.append(np.text)

    #feat = pverb + ' ' + ' '.join(obj)
    return feat
    
def findsvo(ques):
    parsed = nlp(ques)
    a = findSVAOs(parsed)
    return a


question = read_input()
question = question.decode('utf-8')
#print question
svos = findsvo(question)
pos_tags = process(question)
qtype = types(question)
if(qtype == 'STP'):
    features = verboj(question)
else:
    features = nounword(question)

res = {"pos_tags": pos_tags, "qtype": qtype, "features":features}

if __name__ == '__main__':
    output_data(res)
