

project = "TECHRES - SAAS" AND ( (issuetype IN (Story, Task, Bug) AND Sprint = "TRSAAS MQAH SPRINT 2" ) OR (issuetype = Epic AND key IN (TRSAAS-18, TRSAAS-1, TRSAAS-25)) OR (issuetype = "Sub-task" AND parent IN (TRSAAS-18, TRSAAS-1, TRSAAS-25)) )

project = "TECHRES - SAAS" AND ( (issuetype IN (Story, Task, Bug) AND Sprint = 5) OR (issuetype = Epic AND issueFunction IN linkedIssuesOf("project = TECHRES - SAAS AND issuetype IN (Story, Task, Bug) AND Sprint = TRSAAS MQAH SPRINT 2", "is Epic of")) OR (issuetype = "Sub-task" AND issueFunction IN subtasksOf("project = TECHRES - SAAS AND issuetype IN (Story, Task, Bug) AND Sprint = TRSAAS MQAH SPRINT 2")) )