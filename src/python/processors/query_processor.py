import sys
import spacy
from spacy.en import English
from io_utils import read_input, output_data
from consts import intent

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

def nounword(ques):
    featlist = []
    parsed = nlp(ques)
    for np in parsed.noun_chunks :
        featlist.append(np.text)

    return featlist

question = read_input()
question = question.decode('utf-8','ignore')
pos_tags = process(question)
qtype=intention(question)
features=nounword(question)

res = {"pos_tags": pos_tags, "qtype": qtype, "features":features}
output_data(res)
