from scraping import docu
#from query_processor import res
from io_utils import output_data
import json

stepindi = ['steps','substeps','cmd','results']
defindi = ['conbody','shortdesc','body','context']

class rules:
    def __init__(self):
        self.inhash = {'STP': 0,
                       'DEF': 0,
                       'DES': 0}

    def getDitaScore(self,feature):
        return {}

class StepsRule(rules):
    #def __init__(self,class_r) :
        #self.hash = class_r.inhash

    def checkstep(self,element) :
        #self.hash = class_r.inhash
        words = element['xpath'].split('/')
        restype = element['type']
        if( words[-1] in stepindi ) :
            self.hash['STP'] += 10
        if( restype == 'STP' ) :
            self.hash['STP'] += 20

        return self.hash

    def getDitaScore(self,feature):
        self.hash = {'STP': 0,
                       'DEF': 0,
                       'DES': 0}
        return self.checkstep(feature)


class DefRule(rules):
    #def __init__(self,class_r):
        #self.hash = class_r.inhash

    def checkdef(self,element):
        #self.hash = class_r.inhash

        words = element['xpath'].split('/')
        restype = element['type']
        if( words[-1] in defindi ) :
            self.hash['DEF'] += 10
        if( restype == 'DEF' ) :
            self.hash['DEF'] += 20

        return self.hash

    def getDitaScore(self,feature):
        self.hash = {'STP': 0,
                       'DEF': 0,
                       'DES': 0}
        return self.checkdef(feature)


class DescRule(rules):
    #def __init__(self,class_r) :
        #self.hash = class_r.inhash

    def checkdesc(self,element) :
        #self.hash = class_r.inhash

        words = element['xpath'].split('/')
        restype = element['type']
        if( words[-1] in defindi ) :
            self.hash['DES'] += 10
        if( restype == 'DES' ) :
            self.hash['DES'] += 20

        return self.hash

    def getDitaScore(self,feature):
        self.hash = {'STP': 0,
                       'DEF': 0,
                       'DES': 0}
        return self.checkdesc(feature)


# class QueryRule():

#   def queryscore(element):
#       q_text = res['features'].join(' ')
#       if( q_text == element['title'] ):
#           self.hash[queryTypeMap[res['qtype']]] += 5

#       for i in res['features']:
#           if(i in element['subject']):
#               self.hash[queryTypeMap[res['qtype']]] += 5
#           if(i in element['object']):
#               self.hash[queryTypeMap[res['qtype']]] += 3



#   def getDitaScore(self,features):
#       self.hash = {'step': 0,
#                     'definition': 0,
#                     'description': 0}

#       return self.queryscore(feature)


class FeatureProcessor():
    def __init__(self):
         self.totalHash = {'STP': 0,
                           'DEF': 0,
                           'DES': 0}
        #self.rulelist = rularr

    def hashadd(self,a,b):
        for key, value in a.iteritems():
            a[key] = a[key] + b[key]

        return a

    def processRules(self,rularr,feature):
        self.rulelist = rularr
        for rule in self.rulelist:
            ruleHash = rule.getDitaScore(feature)
            #print ruleHash
            self.totalHash = self.hashadd(self.totalHash,ruleHash)
            #print self.totalHash

        return self.totalHash





def scoreadd():
    arr =[]
    c = rules()

#the rule objects
    d = StepsRule()
    a = DescRule()
    b = DefRule()

# the rule-obj array
    arr =[d,a,b]
    for elem in docu:
        #print "I am completed"
        #elem = docu[index]
        f = FeatureProcessor()
        totalScore = f.processRules(arr,elem)
        #print len(docu)
        #print "I am here"
        elem['scores']=    json.dumps(totalScore)

        #print docu
    output_data(docu)


scoreadd()
