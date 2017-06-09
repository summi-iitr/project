import sys
import nltk
from nltk import word_tokenize, sent_tokenize ,pos_tag ,ne_chunk
from nltk.corpus import stopwords
from io_utils import read_input, output_data
from consts import intent

def process(ques):
    words = word_tokenize(ques)
    tagged = pos_tag(words)
    namedent = ne_chunk(tagged)   #does the NER 
    return namedent.pos()
    
def intention(ques):
    words = word_tokenize(ques)
    tagged = pos_tag(words)
    for items in tagged:
       if any ( [ items[1] == 'WRB', items[1] == 'WP', items[1] == 'WDT'] ):
           return intent[items[1]][items[0].lower()]





question = read_input()
pos_tags = process(question)
qtype=intention(question)
output_data(pos_tags)
print qtype

