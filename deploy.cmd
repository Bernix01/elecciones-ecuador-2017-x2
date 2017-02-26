(ECHO [config] && ECHO command = deployment.cmd) >>.deployment
(ECHO npm install --production ^&^& npm start)>>deployment.cmd