import xml.etree.ElementTree as ET

path='frm_getstarted_gs.xml'
path2='frm_generating_output.xml'

#parsing first xml
tree=ET.parse(path)
root=tree.getroot()

#parsing second xml
tree2=ET.parse(path2)
root2=tree2.getroot()
    

filename=[]
filename.append('frm_getstarted_gs.xml')
filename.append('frm_generating_output.xml')
print filename

#textlists
document1=[]
document2=[]

for child in root:
  for i in child:
    #for j in i.iter('title'):
      #document1.append(j.tag+' '+j.text)
 
    for l in i.iter('p'):
      document1.append(l.text)
   
#for elem in document1:
  #print elem
  
  



#tree 2



for child in root2:
  #print child.tag
  for i in child:
    #for j in i.iter('title'):
      #document2.append(j.tag+' '+j.text)
 
    for l in i.iter('p'):
      document2.append(l.text)

#for elem in document2:
  #print elem
  


doclist=[document1,document2]

dictionary = dict(zip(filename, doclist))
print dictionary
