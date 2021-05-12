trap "kill $!" INT TERM EXIT
sleep 2
curl -X "PUT" -H "Content-Type: text/turtle" --data-binary @data/sim.ttl http://localhost:8080/sim
#ldfu -p placeBasicAffordances.n3
ldfu -p program.n3 -n 500
wait
