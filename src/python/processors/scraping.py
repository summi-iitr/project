
import json
import os
from lxml import etree
from io_utils import output_data
from file_utils import absolute_path
path = absolute_path('../../../samples')
def scrape():
    docmap={}

    for filename in os.listdir(path):
        if not filename.endswith('.xml'):continue
        fullname = os.path.join(path,filename)
        tree = etree.parse(fullname)
        root = tree.getroot()

        docmap[filename]={}
        docmap[filename]['type']=root.tag
    
    
        for child in root:
            docmap[filename][child.tag]=''.join(child.itertext()).replace('\n','')


    output_data(docmap)



scrape()
