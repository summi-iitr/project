import xmltodict
import json
import xml.etree.ElementTree as ET
import os
from io_utils import read_input, output_data

path='/Users/utkarsh/codes/Help-bot/samples'

jlist=[]

for filename in os.listdir(path):
    if not filename.endswith('.xml'):continue
    fullname=os.path.join(path,filename)
    tree=ET.parse(fullname)
    root=tree.getroot()
    document_file=open(fullname)

    original_doc=document_file.read()
    parsed=xmltodict.parse(original_doc)
    jsonstr=parsed
    jsonstr=jsonstr[root.tag]
    jsonstr['type']=root.tag
    jsonstr=json.dumps(jsonstr,indent=1)
    jlist.append(jsonstr)


output_data(jlist)






