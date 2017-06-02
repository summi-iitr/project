import sys
import nltk
from nltk import word_tokenize, sent_tokenize ,pos_tag ,ne_chunk
from nltk.corpus import stopwords
from io_utils import read_input, output_data


ques=read_input()

words= word_tokenize(ques)
tagged=pos_tag(words)
namedent=ne_chunk(tagged)

output_data(namedent.pos())
                




    
