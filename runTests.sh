#! /bin/bash

cd /Users/sai_s_weapon/step8/js/arrays/objects/fun/head-js-dileepsa;
failed=0;
passed=0;
fails='';

function execute (){
  command=$1
  message=$2
  code=$3
  $( ${command} &> /dev/null)

  if [[ $? == ${code} ]]; then 
    passed=$(( ${passed} + 1 ))
  else
    failed=$(( ${failed} + 1 ))
    fails+='\n\n'${message}
  fi
}

function main (){
  command="node head.js -n 2 README.md"
  message="1. node head.js -n 2 README.md ===>>> happy path"
  execute "${command}" "${message}" 0
  
  command="node head.js -c 2 README.md"
  message="2. node head.js -c 2 README.md ===>>> happy path"
  execute "${command}" "${message}" 0
  
  command="node head.js -n 2 re README.md"
  message="3. node head.js -n 2 re README.md ===>>> one bad file"
  execute "${command}" "${message}" 1
  
  command="node head.js -n 2 -c 2 README.md"
  message="4. node head.js -n 2 -c 2 README.md ===>>> multiple options"
  execute "${command}" "${message}" 1
  
  command="node head.js -n 2 -n 3 README.md"
  message="5. node head.js -n 2 -n 3 README.md ===>>> same option repeated"
  execute "${command}" "${message}" 0
  
  command="node head.js -n 2 -n 3 badFile"
  message="6. node head.js -n 2 -n 3 badFile ===>>> bad file"
  execute "${command}" "${message}" 1

  echo -e passed: ${passed} failed: ${failed} ${fails}
}

main