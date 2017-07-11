from scraping import docu
#from query_processor import res
from io_utils import output_data

stepindi = ['steps','substeps','cmd']
defindi = ['conbody','shortdesc','body','context']

class rules:
	def __init__(self):
		self.inhash = {'step': 0,
		               'definition': 0,
		               'description': 0}

		# words = element['xpath'].split("/")
		# if( words[-1] in stepindi):
		# 	inhash['steps']+=10
		# if( words[-1] in defindi):
		# 	inhash['definition']+=10
		# 	inhash['description']+=10

		# restype = element['type']
		# if(restype == 'STP'):
		# 	inhash['step']+=20
		# if(restype == 'DEF'):
		# 	inhash['definition']+=20
		# if(restype == 'DES'):
		# 	inhash['description']+=20

		# return inhash
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
		    self.hash['step'] += 10
	    if( restype == 'STP' ) :
	        self.hash['step'] += 20

	    return self.hash

	def getDitaScore(self,feature):
		self.hash = {'step': 0,
		               'definition': 0,
		               'description': 0}
		return self.checkstep(feature)


class DefRule(rules):
	#def __init__(self,class_r):
		#self.hash = class_r.inhash
   
	def checkdef(self,element):
		#self.hash = class_r.inhash

	    words = element['xpath'].split('/')
	    restype = element['type']
	    if( words[-1] in defindi ) :
		    self.hash['definition'] += 10
	    if( restype == 'DEF' ) :
	        self.hash['definition'] += 20

	    return self.hash

	def getDitaScore(self,feature):
		self.hash = {'step': 0,
		               'definition': 0,
		               'description': 0}
		return self.checkdef(feature)


class DescRule(rules):
	#def __init__(self,class_r) :
		#self.hash = class_r.inhash

	def checkdesc(self,element) :
		#self.hash = class_r.inhash

	    words = element['xpath'].split('/')
	    restype = element['type']
	    if( words[-1] in defindi ) :
		    self.hash['description'] += 10
	    if( restype == 'DES' ) :
	        self.hash['description'] += 20

	    return self.hash

	def getDitaScore(self,feature):
		self.hash = {'step': 0,
		               'definition': 0,
		               'description': 0}
		return self.checkdesc(feature)


class FeatureProcessor():
	def __init__(self):
		 self.totalHash = {'step': 0,
		                   'definition': 0,
		                   'description': 0}
		#self.rulelist = rularr 

	def hashadd(self,a,b):
		a['step'] = a['step'] + b['step']
		a['definition'] = a['definition'] + b['definition']
		a['description'] = a['description'] + b['description']

		return a

	def processRules(self,rularr,feature):
		self.rulelist = rularr
		for rule in self.rulelist:
			ruleHash = rule.getDitaScore(feature)
			#print ruleHash
			self.totalHash = self.hashadd(self.totalHash,ruleHash)
			#print self.totalHash

		return self.totalHash





arr =[]
c = rules()
# d = StepsRule(c)
# a = DescRule(c)
# b = DefRule(c)

#arr =[d,a,b]
#f = FeatureProcessor(c)


d = StepsRule()
a = DescRule()
b = DefRule()

arr =[d,a,b]
for elem in docu:
	f = FeatureProcessor()
	elem['scores'] = f.processRules(arr,elem)
	

output_data(docu)



