
#mapping the pos_tag() words to user intent


intent={'WRB':{'how':'Process', 'where':'Place', 'why':'Reason','when':'Time'},
         'WP':{'what':'Information','who':'Person', 'whom':'Person'},
         'WDT':{'what':'Information','which':'Information'}
         }


SUBJECTS = ["nsubj", "nsubjpass", "csubj", "csubjpass", "agent"]
OBJECTS = ["dobj", "dative", "attr", "oprd","pobj"]

