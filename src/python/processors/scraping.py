import xmltodict
import json
import xml.etree.ElementTree as ET
import os
from io_utils import output_data
from file_utils import absolute_path
path = absolute_path('../../../samples')
def scrape():
    jlist=[]

    for filename in os.listdir(path):
        if not filename.endswith('.xml'):continue
        fullname = os.path.join(path,filename)
        tree = ET.parse(fullname)
        root = tree.getroot()
        document_file = open(fullname)

        original_doc = document_file.read()
        parsed = xmltodict.parse(original_doc)

        jsonstr = parsed
        jsonstr = jsonstr[root.tag]
        jsonstr['type'] = root.tag
        jlist.append(jsonstr)
        output_data(json.dumps(jlist))

scrape()
