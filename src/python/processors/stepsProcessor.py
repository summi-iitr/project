class StepsProcessor:
    def __init__(self, node):
        self.xmlNode = node

    def getSteps(self):
        steps = []
        for node in self.xmlNode:
            if(node.text):
                steps.append(node.text)
        print steps
        return steps

    def getStepsHTML(self):
        steps = self.getSteps()
        stepsHTML = ""
        for step in steps:
            stepsHTML+= "<li> " + step + " </li>"

        stepsHTML = "<ul>" + stepsHTML + "</ul>"
        return stepsHTML
