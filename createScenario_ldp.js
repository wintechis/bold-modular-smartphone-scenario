const N3 = require('n3');
const { DataFactory } = N3;
const { blankNode, namedNode, literal, quad } = DataFactory;
const fs = require('fs');

const rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
const arena = 'http://arena2036.example.org/'
const xsd = 'http://www.w3.org/2001/XMLSchema#'
const ldp = 'http://www.w3.org/ns/ldp#'

let rawdata = fs.readFileSync(process.argv[2]);
let scenario = JSON.parse(rawdata);

const store = new N3.Store();

count = {
    'soldering': 1,
    'memoryStorage': 1,
    'cpuStorage': 1,
    'boardStorage': 1,
    'fixing': 1,
    'portStorage': 1,
    'metalStorage': 1,
    'plasticStorage': 1,
    'metalCasting': 1,
    'plasticCasting': 1,
    'communicationStorage': 1,
    'sensorStorage': 1,
    'bolting': 1,
    'batteryCellStorage': 1,
    'combining': 1,
    'glasStorage': 1,
    'lcdStorage': 1,
    'gluing': 1,
    'delivery': 1,
    'fastTransporter': 1,
    'slowTransporter': 1
}

store.addQuads([
    quad(namedNode('/'), namedNode(rdf + 'type'), namedNode(ldp + 'BasicContainer'), namedNode('/')),
    quad(namedNode('/'), namedNode(ldp + 'contains'), namedNode('recipes'), namedNode('/')),
    quad(namedNode('recipes'), namedNode(rdf + 'type'), namedNode(ldp + 'BasicContainer'), namedNode('recipes')),
    ...getRecipe('mainboardRecipe', 'boardStorage', [], [
        'mainboard'
    ], 4, 0, 1),
    ...getRecipe('cpuRecipe', 'cpuStorage', [], [
        'cpu'
    ], 5, 0, 1),
    ...getRecipe('ramRecipe', 'memoryStorage', [], [
        'ram'
    ], 3, 0, 1),
    ...getRecipe('flashMemoryRecipe', 'memoryStorage', [], [
        'flashMemory'
    ], 4, 0, 1),
    ...getRecipe('mainModuleRecipe', 'soldering', [
        'cpu',
        'ram',
        'flashMemory',
        'mainboard'
    ], [
        'mainModule'
    ], 6, 1, 2),
    quad(namedNode('/'), namedNode(ldp + 'contains'), namedNode('workstations'), namedNode('/')),
    quad(namedNode('workstations'), namedNode(rdf + 'type'), namedNode(ldp + 'BasicContainer'), namedNode('workstations')),
    quad(namedNode('/'), namedNode(ldp + 'contains'), namedNode('transporters'), namedNode('/')),
    quad(namedNode('transporters'), namedNode(rdf + 'type'), namedNode(ldp + 'BasicContainer'), namedNode('transporters')),
])

scenario.forEach(element => {
    switch(element.type) {
        case 'shopfloor':
            store.addQuads([
                quad(namedNode('/'), namedNode(ldp + 'contains'), namedNode('shopfloor'), namedNode('/')),
                quad(namedNode('shopfloor'), namedNode(rdf + 'type'), namedNode(arena + 'Shopfloor'), namedNode('shopfloor')),
                quad(namedNode('shopfloor'), namedNode(arena + 'sizeX'), literal(element['x']), namedNode('shopfloor')),
                quad(namedNode('shopfloor'), namedNode(arena + 'sizeY'), literal(element['y']), namedNode('shopfloor')),
            ])
            break
        case 'soldering': {
            let x2 = element['x'] + 3
            let y2 = element['y'] + 1
            let inputX = element['x'] - 1
            let inputY = element['y']
            let outputX = element['x'] + 4
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 3
                inputX = element['x']
                inputY = element['y'] - 1
                outputX = element['x'] + 1
                outputY = element['y'] + 4
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 3
                y2 = element['y'] + 1
                inputX = element['x'] + 4
                inputY = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 3
                inputX = element['x'] + 1
                inputY = element['y'] + 4
                outputX = element['x']
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/solderingStation' + count['soldering']), namedNode('workstations')),
                quad(namedNode('workstations/solderingStation' + count['soldering']), namedNode(rdf + 'type'), namedNode(ldp + 'BasicContainer'), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(namedNode('workstations/solderingStation' + count['soldering']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(namedNode('workstations/solderingStation' + count['soldering']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(namedNode('workstations/solderingStation' + count['soldering']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(namedNode('workstations/solderingStation' + count['soldering']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(namedNode('workstations/solderingStation' + count['soldering']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(namedNode('workstations/solderingStation' + count['soldering']), namedNode(arena + 'skills'), namedNode(arena + 'soldering'), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(namedNode('workstations/solderingStation' + count['soldering']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(namedNode('workstations/solderingStation' + count['soldering']), namedNode(arena + 'inputPort'), blankNode('soldering' + count['soldering'] + 'input'), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(namedNode('workstations/solderingStation' + count['soldering']), namedNode(arena + 'outputPort'), blankNode('soldering' + count['soldering'] + 'output'), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/solderingStation' + count['soldering'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/solderingStation', 'soldering', 'mainModuleRecipe'))
            count['soldering'] += 1
            break
        }
        case 'memoryStorage': {
            let x2 = element['x'] + 1
            let y2 = element['y'] + 1
            let outputX = element['x'] + 2
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x']
                outputY = element['y'] + 2
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] + 1
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/memoryStorageStation' + count['memoryStorage']), namedNode('workstations')),
                quad(namedNode('workstations/memoryStorageStation' + count['memoryStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('workstations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('workstations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('workstations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('workstations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('workstations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'skills'), namedNode(arena + 'memoryStorage'), namedNode('workstations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('workstations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('workstations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'outputPort'), blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode('workstations/memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/memoryStorageStation' + count['memoryStorage'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/memoryStorageStation', 'memoryStorage', 'ramRecipe'))
            count['memoryStorage'] += 1
            break
        }
        case 'cpuStorage': {
            let x2 = element['x'] + 1
            let y2 = element['y'] + 1
            let outputX = element['x'] + 2
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x']
                outputY = element['y'] + 2
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] + 1
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/cpuStorageStation' + count['cpuStorage']), namedNode('workstations')),
                quad(namedNode('workstations/cpuStorageStation' + count['cpuStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('workstations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('workstations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('workstations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('workstations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('workstations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'skills'), namedNode(arena + 'cpuStorage'), namedNode('workstations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('workstations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('workstations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'outputPort'), blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode('workstations/cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/cpuStorageStation' + count['cpuStorage'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/cpuStorageStation', 'cpuStorage', 'cpuRecipe'))
            count['cpuStorage'] += 1
            break
        }
        case 'boardStorage': {
            let x2 = element['x'] + 1
            let y2 = element['y'] + 1
            let outputX = element['x'] + 2
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x']
                outputY = element['y'] + 2
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] + 1
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/boardStorageStation' + count['boardStorage']), namedNode('workstations')),
                quad(namedNode('workstations/boardStorageStation' + count['boardStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('workstations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('workstations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('workstations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('workstations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('workstations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'skills'), namedNode(arena + 'boardStorage'), namedNode('workstations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('workstations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('workstations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'outputPort'), blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode('workstations/boardStorageStation' + count['boardStorage'])),
                quad(blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/boardStorageStation' + count['boardStorage'])),
                quad(blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/boardStorageStation' + count['boardStorage'])),
                quad(blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/boardStorageStation' + count['boardStorage'])),
                quad(blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/boardStorageStation' + count['boardStorage'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/boardStorageStation', 'boardStorage', 'mainboardRecipe'))
            count['boardStorage'] += 1
            break
        }
        case 'fixing': {
            let x2 = element['x'] + 3
            let y2 = element['y'] + 1
            let inputX = element['x'] - 1
            let inputY = element['y']
            let outputX = element['x'] + 4
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 3
                inputX = element['x']
                inputY = element['y'] - 1
                outputX = element['x'] + 1
                outputY = element['y'] + 4
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 3
                y2 = element['y'] + 1
                inputX = element['x'] + 4
                inputY = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 3
                inputX = element['x'] + 1
                inputY = element['y'] + 4
                outputX = element['x']
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/fixingStation' + count['fixing']), namedNode('workstations')),
                quad(namedNode('workstations/fixingStation' + count['fixing']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(namedNode('workstations/fixingStation' + count['fixing']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(namedNode('workstations/fixingStation' + count['fixing']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(namedNode('workstations/fixingStation' + count['fixing']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(namedNode('workstations/fixingStation' + count['fixing']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(namedNode('workstations/fixingStation' + count['fixing']), namedNode(arena + 'skills'), namedNode(arena + 'fixing'), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(namedNode('workstations/fixingStation' + count['fixing']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(namedNode('workstations/fixingStation' + count['fixing']), namedNode(arena + 'inputPort'), blankNode('fixing' + count['fixing'] + 'input'), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(namedNode('workstations/fixingStation' + count['fixing']), namedNode(arena + 'outputPort'), blankNode('fixing' + count['fixing'] + 'output'), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/fixingStation' + count['fixing'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/fixingStation', 'fixing', 'mainModuleWithPortsRecipe'))
            count['fixing'] += 1
            break
        }
        case 'portStorage': {
            let x2 = element['x'] + 2
            let y2 = element['y'] + 1
            let outputX = element['x'] + 3
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 2
                outputX = element['x']
                outputY = element['y'] + 3
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 2
                y2 = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 2
                outputX = element['x'] + 1
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/portStorageStation' + count['portStorage']), namedNode('workstations')),
                quad(namedNode('workstations/portStorageStation' + count['portStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/portStorageStation' + count['portStorage'])),
                quad(namedNode('workstations/portStorageStation' + count['portStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/portStorageStation' + count['portStorage'])),
                quad(namedNode('workstations/portStorageStation' + count['portStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/portStorageStation' + count['portStorage'])),
                quad(namedNode('workstations/portStorageStation' + count['portStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/portStorageStation' + count['portStorage'])),
                quad(namedNode('workstations/portStorageStation' + count['portStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/portStorageStation' + count['portStorage'])),
                quad(namedNode('workstations/portStorageStation' + count['portStorage']), namedNode(arena + 'skills'), namedNode(arena + 'portStorage'), namedNode('workstations/portStorageStation' + count['portStorage'])),
                quad(namedNode('workstations/portStorageStation' + count['portStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/portStorageStation' + count['portStorage'])),
                quad(namedNode('workstations/portStorageStation' + count['portStorage']), namedNode(arena + 'outputPort'), blankNode('portStorage' + count['portStorage'] + 'output'), namedNode('workstations/portStorageStation' + count['portStorage'])),
                quad(blankNode('portStorage' + count['portStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/portStorageStation' + count['portStorage'])),
                quad(blankNode('portStorage' + count['portStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/portStorageStation' + count['portStorage'])),
                quad(blankNode('portStorage' + count['portStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/portStorageStation' + count['portStorage'])),
                quad(blankNode('portStorage' + count['portStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/portStorageStation' + count['portStorage'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/portStorageStation', 'portStorage', 'microUSBRecipe'))
            count['portStorage'] += 1
            break
        }
        case 'metalCasting': {
            let x2 = element['x'] + 4
            let y2 = element['y'] + 1
            let inputX = element['x'] - 1
            let inputY = element['y']
            let outputX = element['x'] + 5
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 4
                inputX = element['x']
                inputY = element['y'] - 1
                outputX = element['x'] + 1
                outputY = element['y'] + 5
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 4
                y2 = element['y'] + 1
                inputX = element['x'] + 5
                inputY = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 4
                inputX = element['x'] + 1
                inputY = element['y'] + 5
                outputX = element['x']
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/metalCastingStation' + count['metalCasting']), namedNode('workstations')),
                quad(namedNode('workstations/metalCastingStation' + count['metalCasting']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('workstations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('workstations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('workstations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('workstations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('workstations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'skills'), namedNode(arena + 'metalCasting'), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('workstations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('workstations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'inputPort'), blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('workstations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'outputPort'), blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/metalCastingStation' + count['metalCasting'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/metalCastingStation', 'metalCasting', 'metalCaseRecipe'))
            count['metalCasting'] += 1
            break
        }
        case 'plasticCasting': {
            let x2 = element['x'] + 4
            let y2 = element['y'] + 1
            let inputX = element['x'] - 1
            let inputY = element['y']
            let outputX = element['x'] + 5
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 4
                inputX = element['x']
                inputY = element['y'] - 1
                outputX = element['x'] + 1
                outputY = element['y'] + 5
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 4
                y2 = element['y'] + 1
                inputX = element['x'] + 5
                inputY = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 4
                inputX = element['x'] + 1
                inputY = element['y'] + 5
                outputX = element['x']
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/plasticCastingStation' + count['plasticCasting']), namedNode('workstations')),
                quad(namedNode('workstations/plasticCastingStation' + count['plasticCasting']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('workstations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('workstations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('workstations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('workstations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('workstations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'skills'), namedNode(arena + 'plasticCasting'), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('workstations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('workstations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'inputPort'), blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('workstations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'outputPort'), blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/plasticCastingStation' + count['plasticCasting'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/plasticCastingStation', 'plasticCasting', 'plasticCaseRecipe'))
            count['plasticCasting'] += 1
            break
        }
        case 'metalStorage': {
            let x2 = element['x'] + 1
            let y2 = element['y'] + 1
            let outputX = element['x'] + 2
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x']
                outputY = element['y'] + 2
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] + 1
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/metalStorageStation' + count['metalStorage']), namedNode('workstations')),
                quad(namedNode('workstations/metalStorageStation' + count['metalStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('workstations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('workstations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('workstations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('workstations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('workstations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'skills'), namedNode(arena + 'metalStorage'), namedNode('workstations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('workstations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('workstations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'outputPort'), blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode('workstations/metalStorageStation' + count['metalStorage'])),
                quad(blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/metalStorageStation' + count['metalStorage'])),
                quad(blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/metalStorageStation' + count['metalStorage'])),
                quad(blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/metalStorageStation' + count['metalStorage'])),
                quad(blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/metalStorageStation' + count['metalStorage'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/metalStorageStation', 'metalStorage', 'metalRecipe'))
            count['metalStorage'] += 1
            break
        }
        case 'plasticStorage': {
            let x2 = element['x'] + 1
            let y2 = element['y'] + 1
            let outputX = element['x'] + 2
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x']
                outputY = element['y'] + 2
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] + 1
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/plasticStorageStation' + count['plasticStorage']), namedNode('workstations')),
                quad(namedNode('workstations/plasticStorageStation' + count['plasticStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('workstations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('workstations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('workstations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('workstations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('workstations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'skills'), namedNode(arena + 'plasticStorage'), namedNode('workstations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('workstations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('workstations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'outputPort'), blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode('workstations/plasticStorageStation' + count['plasticStorage'])),
                quad(blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/plasticStorageStation' + count['plasticStorage'])),
                quad(blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/plasticStorageStation' + count['plasticStorage'])),
                quad(blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/plasticStorageStation' + count['plasticStorage'])),
                quad(blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/plasticStorageStation' + count['plasticStorage'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/plasticStorageStation', 'plasticStorage', 'plasticRecipe'))
            count['plasticStorage'] += 1
            break
        }
        case 'bolting': {
            let x2 = element['x'] + 3
            let y2 = element['y'] + 1
            let inputX = element['x'] - 1
            let inputY = element['y']
            let outputX = element['x'] + 4
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 3
                inputX = element['x']
                inputY = element['y'] - 1
                outputX = element['x'] + 1
                outputY = element['y'] + 4
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 3
                y2 = element['y'] + 1
                inputX = element['x'] + 4
                inputY = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 3
                inputX = element['x'] + 1
                inputY = element['y'] + 4
                outputX = element['x']
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/boltingStation' + count['bolting']), namedNode('workstations')),
                quad(namedNode('workstations/boltingStation' + count['bolting']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(namedNode('workstations/boltingStation' + count['bolting']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(namedNode('workstations/boltingStation' + count['bolting']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(namedNode('workstations/boltingStation' + count['bolting']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(namedNode('workstations/boltingStation' + count['bolting']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(namedNode('workstations/boltingStation' + count['bolting']), namedNode(arena + 'skills'), namedNode(arena + 'bolting'), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(namedNode('workstations/boltingStation' + count['bolting']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(namedNode('workstations/boltingStation' + count['bolting']), namedNode(arena + 'inputPort'), blankNode('bolting' + count['bolting'] + 'input'), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(namedNode('workstations/boltingStation' + count['bolting']), namedNode(arena + 'outputPort'), blankNode('bolting' + count['bolting'] + 'output'), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/boltingStation' + count['bolting'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/boltingStation', 'bolting', 'caseWithMainModuleRecipe'))
            count['bolting'] += 1
            break
        }
        case 'communicationStorage': {
            let x2 = element['x'] + 1
            let y2 = element['y'] + 1
            let outputX = element['x'] + 2
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x']
                outputY = element['y'] + 2
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] + 1
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode('workstations')),
                quad(namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'skills'), namedNode(arena + 'communicationStorage'), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'queue'), namedNode('workstations/communicationStorageStation' + count['communicationStorage'] + 'TaskQueue'), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'affordances'), namedNode('workstations/communicationStorageStation' + count['communicationStorage'] + 'Affordances'), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'recipe'), namedNode('wifiRecipe'), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'outputPort'), blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('workstations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('workstations/communicationStorageStation' + count['communicationStorage'] + 'TaskQueue')),
            ])
            store.addQuads(getStationContainerQuads('workstations/communicationStorageStation', 'communicationStorage', 'wifiRecipe'))
            count['communicationStorage'] += 1
            break
        }
        case 'sensorStorage': {
            let x2 = element['x'] + 1
            let y2 = element['y'] + 1
            let outputX = element['x'] + 2
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x']
                outputY = element['y'] + 2
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] + 1
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/sensorStorageStation' + count['sensorStorage']), namedNode('workstations')),
                quad(namedNode('workstations/sensorStorageStation' + count['sensorStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('workstations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('workstations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('workstations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('workstations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('workstations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'skills'), namedNode(arena + 'sensorStorage'), namedNode('workstations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('workstations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('workstations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'outputPort'), blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode('workstations/sensorStorageStation' + count['sensorStorage'])),
                quad(blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/sensorStorageStation' + count['sensorStorage'])),
                quad(blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/sensorStorageStation' + count['sensorStorage'])),
                quad(blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/sensorStorageStation' + count['sensorStorage'])),
                quad(blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/sensorStorageStation' + count['sensorStorage'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/sensorStorageStation', 'sensorStorage', 'cameraRecipe'))
            count['sensorStorage'] += 1
            break
        }
        case 'batteryCellStorage': {
            let x2 = element['x'] + 2
            let y2 = element['y'] + 1
            let outputX = element['x'] + 3
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 2
                outputX = element['x']
                outputY = element['y'] + 3
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 2
                y2 = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 2
                outputX = element['x'] + 1
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode('workstations')),
                quad(namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'skills'), namedNode(arena + 'batteryCellStorage'), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'outputPort'), blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/batteryCellStorageStation' + count['batteryCellStorage'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/batteryCellStorageStation', 'batteryCellStorage', 'batteryCellRecipe'))
            count['batteryCellStorage'] += 1
            break
        }
        case 'combining': {
            let x2 = element['x'] + 3
            let y2 = element['y'] + 1
            let inputX = element['x'] - 1
            let inputY = element['y']
            let outputX = element['x'] + 4
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 3
                inputX = element['x']
                inputY = element['y'] - 1
                outputX = element['x'] + 1
                outputY = element['y'] + 4
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 3
                y2 = element['y'] + 1
                inputX = element['x'] + 4
                inputY = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 3
                inputX = element['x'] + 1
                inputY = element['y'] + 4
                outputX = element['x']
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/combiningStation' + count['combining']), namedNode('workstations')),
                quad(namedNode('workstations/combiningStation' + count['combining']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/combiningStation' + count['combining'])),
                quad(namedNode('workstations/combiningStation' + count['combining']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/combiningStation' + count['combining'])),
                quad(namedNode('workstations/combiningStation' + count['combining']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/combiningStation' + count['combining'])),
                quad(namedNode('workstations/combiningStation' + count['combining']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/combiningStation' + count['combining'])),
                quad(namedNode('workstations/combiningStation' + count['combining']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/combiningStation' + count['combining'])),
                quad(namedNode('workstations/combiningStation' + count['combining']), namedNode(arena + 'skills'), namedNode(arena + 'combining'), namedNode('workstations/combiningStation' + count['combining'])),
                quad(namedNode('workstations/combiningStation' + count['combining']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/combiningStation' + count['combining'])),
                quad(namedNode('workstations/combiningStation' + count['combining']), namedNode(arena + 'inputPort'), blankNode('combining' + count['combining'] + 'input'), namedNode('workstations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('workstations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('workstations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('workstations/combiningStation' + count['combining'])),
                quad(namedNode('workstations/combiningStation' + count['combining']), namedNode(arena + 'outputPort'), blankNode('combining' + count['combining'] + 'output'), namedNode('workstations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/combiningStation' + count['combining'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/combiningStation', 'combining', 'batteryRecipe'))
            count['combining'] += 1
            break
        }
        case 'gluing': {
            let x2 = element['x'] + 2
            let y2 = element['y'] + 1
            let inputX = element['x'] - 1
            let inputY = element['y']
            let outputX = element['x'] + 3
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 2
                inputX = element['x']
                inputY = element['y'] - 1
                outputX = element['x'] + 1
                outputY = element['y'] + 3
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 2
                y2 = element['y'] + 1
                inputX = element['x'] + 3
                inputY = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 2
                inputX = element['x'] + 1
                inputY = element['y'] + 3
                outputX = element['x']
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/gluingStation' + count['gluing']), namedNode('workstations')),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'locationX2'), literal(x2), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'locationY2'), literal(y2), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'skills'), namedNode(arena + 'gluing'), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'inputPort'), blankNode('gluing' + count['gluing'] + 'input'), namedNode('gluingStation' + count['gluing'])),
                quad(blankNode('gluing' + count['gluing'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('gluingStation' + count['gluing'])),
                quad(blankNode('gluing' + count['gluing'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('gluingStation' + count['gluing'])),
                quad(blankNode('gluing' + count['gluing'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('gluingStation' + count['gluing'])),
                quad(blankNode('gluing' + count['gluing'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'outputPort'), blankNode('gluing' + count['gluing'] + 'output'), namedNode('gluingStation' + count['gluing'])),
                quad(blankNode('gluing' + count['gluing'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('gluingStation' + count['gluing'])),
                quad(blankNode('gluing' + count['gluing'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('gluingStation' + count['gluing'])),
                quad(blankNode('gluing' + count['gluing'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('gluingStation' + count['gluing'])),
                quad(blankNode('gluing' + count['gluing'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('gluingStation' + count['gluing'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/gluingStation', 'gluing', 'smartphoneRecipe'))
            count['gluing'] += 1
            break
        }
        case 'delivery': {
            let x2 = element['x'] + 2
            let y2 = element['y'] + 1
            let inputX = element['x'] + 3
            let inputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 2
                inputX = element['x']
                inputY = element['y'] + 3
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 2
                y2 = element['y'] + 1
                inputX = element['x'] - 1
                inputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 2
                inputX = element['x'] + 1
                inputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/deliveryStation' + count['delivery']), namedNode('workstations')),
                quad(namedNode('workstations/deliveryStation' + count['delivery']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/deliveryStation' + count['delivery'])),
                quad(namedNode('workstations/deliveryStation' + count['delivery']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/deliveryStation' + count['delivery'])),
                quad(namedNode('workstations/deliveryStation' + count['delivery']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/deliveryStation' + count['delivery'])),
                quad(namedNode('workstations/deliveryStation' + count['delivery']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/deliveryStation' + count['delivery'])),
                quad(namedNode('workstations/deliveryStation' + count['delivery']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/deliveryStation' + count['delivery'])),
                quad(namedNode('workstations/deliveryStation' + count['delivery']), namedNode(arena + 'skills'), namedNode(arena + 'delivery'), namedNode('workstations/deliveryStation' + count['delivery'])),
                quad(namedNode('workstations/deliveryStation' + count['delivery']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/deliveryStation' + count['delivery'])),
                quad(namedNode('workstations/deliveryStation' + count['delivery']), namedNode(arena + 'inputPort'), blankNode('delivery' + count['delivery'] + 'input'), namedNode('workstations/deliveryStation' + count['delivery'])),
                quad(blankNode('delivery' + count['delivery'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/deliveryStation' + count['delivery'])),
                quad(blankNode('delivery' + count['delivery'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('workstations/deliveryStation' + count['delivery'])),
                quad(blankNode('delivery' + count['delivery'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('workstations/deliveryStation' + count['delivery'])),
                quad(blankNode('delivery' + count['delivery'] + 'input'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/deliveryStation' + count['delivery'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/deliveryStation', 'delivery', 'deliveryRecipe'))
            count['delivery'] += 1
            break
        }
        case 'glasStorage': {
            let x2 = element['x'] + 1
            let y2 = element['y'] + 1
            let outputX = element['x'] + 2
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x']
                outputY = element['y'] + 2
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] + 1
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/glasStorageStation' + count['glasStorage']), namedNode('workstations')),
                quad(namedNode('workstations/glasStorageStation' + count['glasStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('workstations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('workstations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('workstations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('workstations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('workstations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'skills'), namedNode(arena + 'glasStorage'), namedNode('workstations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('workstations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('workstations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'outputPort'), blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode('workstations/glasStorageStation' + count['glasStorage'])),
                quad(blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/glasStorageStation' + count['glasStorage'])),
                quad(blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/glasStorageStation' + count['glasStorage'])),
                quad(blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/glasStorageStation' + count['glasStorage'])),
                quad(blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/glasStorageStation' + count['glasStorage'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/glasStorageStation', 'glasStorage', 'glasRecipe'))
            count['glasStorage'] += 1
            break
        }
        case 'lcdStorage': {
            let x2 = element['x'] + 1
            let y2 = element['y'] + 1
            let outputX = element['x'] + 2
            let outputY = element['y'] + 1
            if(element['rotation'] >= 45 && element['rotation'] < 135) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x']
                outputY = element['y'] + 2
            } else if(element['rotation'] >= 135 && element['rotation'] < 225) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] - 1
                outputY = element['y']
            } else if(element['rotation'] >= 225 && element['rotation'] < 315) {
                x2 = element['x'] + 1
                y2 = element['y'] + 1
                outputX = element['x'] + 1
                outputY = element['y'] - 1
            }
            store.addQuads([
                quad(namedNode('workstations'), namedNode(ldp + 'contains'), namedNode('workstations/lcdStorageStation' + count['lcdStorage']), namedNode('workstations')),
                quad(namedNode('workstations/lcdStorageStation' + count['lcdStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('workstations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('workstations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('workstations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('workstations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('workstations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('workstations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('workstations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('workstations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('workstations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('workstations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'skills'), namedNode(arena + 'lcdStorage'), namedNode('workstations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('workstations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('workstations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('workstations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'outputPort'), blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode('workstations/lcdStorageStation' + count['lcdStorage'])),
                quad(blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('workstations/lcdStorageStation' + count['lcdStorage'])),
                quad(blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('workstations/lcdStorageStation' + count['lcdStorage'])),
                quad(blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('workstations/lcdStorageStation' + count['lcdStorage'])),
                quad(blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('workstations/lcdStorageStation' + count['lcdStorage'])),
            ])
            store.addQuads(getStationContainerQuads('workstations/lcdStorageStation', 'lcdStorage', 'lcdRecipe'))
            count['lcdStorage'] += 1
            break
        }
        case 'slowTransporter':
            store.addQuads([
                quad(namedNode('transporters'), namedNode(ldp + 'contains'), namedNode('transporters/slowTransporter' + count['slowTransporter']), namedNode('transporters')),
                quad(namedNode('transporters/slowTransporter' + count['slowTransporter']), namedNode(rdf + 'type'), namedNode(arena + 'Transporter'), namedNode('transporters/slowTransporter' + count['slowTransporter'])),
                quad(namedNode('transporters/slowTransporter' + count['slowTransporter']), namedNode(arena + 'locationX'), literal(element['x']), namedNode('transporters/slowTransporter' + count['slowTransporter'])),
                quad(namedNode('transporters/slowTransporter' + count['slowTransporter']), namedNode(arena + 'locationY'), literal(element['y']), namedNode('transporters/slowTransporter' + count['slowTransporter'])),
                quad(namedNode('transporters/slowTransporter' + count['slowTransporter']), namedNode(arena + 'speed'), literal(0.5, namedNode(xsd + 'decimal')), namedNode('transporters/slowTransporter' + count['slowTransporter'])),
                quad(namedNode('transporters/slowTransporter' + count['slowTransporter']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('transporters/slowTransporter' + count['slowTransporter'])),
                quad(namedNode('transporters/slowTransporter' + count['slowTransporter']), namedNode(arena + 'capacity'), literal(4), namedNode('transporters/slowTransporter' + count['slowTransporter'])),
            ])
            store.addQuads(getTransporterContainerQuads('transporters/slowTransporter', 'slowTransporter'))
            count['slowTransporter'] += 1
            break
        case 'fastTransporter':
            store.addQuads([
                quad(namedNode('transporters'), namedNode(ldp + 'contains'), namedNode('transporters/fastTransporter' + count['fastTransporter']), namedNode('transporters')),
                quad(namedNode('transporters/fastTransporter' + count['fastTransporter']), namedNode(rdf + 'type'), namedNode(arena + 'Transporter'), namedNode('transporters/fastTransporter' + count['fastTransporter'])),
                quad(namedNode('transporters/fastTransporter' + count['fastTransporter']), namedNode(arena + 'locationX'), literal(element['x']), namedNode('transporters/fastTransporter' + count['fastTransporter'])),
                quad(namedNode('transporters/fastTransporter' + count['fastTransporter']), namedNode(arena + 'locationY'), literal(element['y']), namedNode('transporters/fastTransporter' + count['fastTransporter'])),
                quad(namedNode('transporters/fastTransporter' + count['fastTransporter']), namedNode(arena + 'speed'), literal(1, namedNode(xsd + 'decimal')), namedNode('transporters/fastTransporter' + count['fastTransporter'])),
                quad(namedNode('transporters/fastTransporter' + count['fastTransporter']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('transporters/fastTransporter' + count['fastTransporter'])),
                quad(namedNode('transporters/fastTransporter' + count['fastTransporter']), namedNode(arena + 'capacity'), literal(2), namedNode('transporters/fastTransporter' + count['fastTransporter'])),
            ])
            store.addQuads(getTransporterContainerQuads('transporters/fastTransporter', 'fastTransporter'))
            count['fastTransporter'] += 1
            break
    }
});

const writer = new N3.Writer(fs.createWriteStream(process.argv[2].substring(0, process.argv[2].lastIndexOf('.')) + '_ldp.trig'), {
        prefixes: {
            rdf: rdf,
            arena: arena,
            xsd: xsd
    },
    format: 'application/trig'
});
writer.addQuads(store.getQuads(null, null, null, null))
writer.end()

function getStationContainerQuads(stationName, countName, recipe) {
    return [
        // Indirect Container for properties, esp. recipe
        quad(namedNode(stationName + count[countName]), namedNode(ldp + 'contains'), namedNode(stationName + count[countName] + '/properties'), namedNode(stationName + count[countName])),
        quad(namedNode(stationName + count[countName] + '/properties'), namedNode(rdf + 'type'), namedNode(ldp + 'IndirectContainer'), namedNode(stationName + count[countName] + '/properties')),
        quad(namedNode(stationName + count[countName] + '/properties'), namedNode(rdf + 'type'), namedNode(arena + 'PropertyContainer'), namedNode(stationName + count[countName] + '/properties')),
        quad(namedNode(stationName + count[countName] + '/properties'), namedNode(ldp + 'membershipResource'), namedNode(stationName + count[countName]), namedNode(stationName + count[countName] + '/properties')),
        quad(namedNode(stationName + count[countName] + '/properties'), namedNode(ldp + 'hasMemberRelation'), namedNode(arena + 'recipe'), namedNode(stationName + count[countName] + '/properties')),
        quad(namedNode(stationName + count[countName] + '/properties'), namedNode(ldp + 'insertedContentRelation'), namedNode(rdf + 'value'), namedNode(stationName + count[countName] + '/properties')),
        quad(namedNode(stationName + count[countName] + '/properties'), namedNode(ldp + 'contains'), namedNode(stationName + count[countName] + '/properties/recipe'), namedNode(stationName + count[countName] + '/properties')),
        quad(namedNode(stationName + count[countName] + '/properties/recipe'), namedNode(rdf + 'value'), namedNode('recipes/' + recipe), namedNode(stationName + count[countName] + '/properties/recipe')),
        // Ordered Container for task queue
        quad(namedNode(stationName + count[countName]), namedNode(ldp + 'contains'), namedNode(stationName + count[countName] + '/tasks'), namedNode(stationName + count[countName])),
        quad(namedNode(stationName + count[countName] + '/tasks'), namedNode(rdf + 'type'), namedNode(ldp + 'OrderedContainer'), namedNode(stationName + count[countName] + '/tasks')),
        quad(namedNode(stationName + count[countName] + '/tasks'), namedNode(rdf + 'type'), namedNode(arena + 'TaskContainer'), namedNode(stationName + count[countName] + '/tasks')),
        quad(namedNode(stationName + count[countName] + '/tasks'), namedNode(ldp + 'membershipResource'), namedNode(stationName + count[countName]), namedNode(stationName + count[countName] + '/tasks')),
        quad(namedNode(stationName + count[countName] + '/tasks'), namedNode(ldp + 'hasMemberRelation'), namedNode(arena + 'activeTask'), namedNode(stationName + count[countName] + '/tasks')),
        quad(namedNode(stationName + count[countName] + '/tasks'), namedNode(ldp + 'orderContentRelation'), namedNode(arena + 'queuePosition'), namedNode(stationName + count[countName] + '/tasks')),
        // Direct Container for affordances
        quad(namedNode(stationName + count[countName]), namedNode(ldp + 'contains'), namedNode(stationName + count[countName] + '/affordances'), namedNode(stationName + count[countName])),
        quad(namedNode(stationName + count[countName] + '/affordances'), namedNode(rdf + 'type'), namedNode(ldp + 'DirectContainer'), namedNode(stationName + count[countName] + '/affordances')),
        quad(namedNode(stationName + count[countName] + '/affordances'), namedNode(rdf + 'type'), namedNode(arena + 'AffordanceContainer'), namedNode(stationName + count[countName] + '/affordances')),
        quad(namedNode(stationName + count[countName] + '/affordances'), namedNode(ldp + 'membershipResource'), namedNode(stationName + count[countName]), namedNode(stationName + count[countName] + '/affordances')),
        quad(namedNode(stationName + count[countName] + '/affordances'), namedNode(ldp + 'hasMemberRelation'), namedNode(arena + 'affords'), namedNode(stationName + count[countName] + '/affordances')),
    ]
}

function getTransporterContainerQuads(transporterName, countName) {
    return [
        // Ordered Container for task queue
        quad(namedNode(transporterName + count[countName]), namedNode(ldp + 'contains'), namedNode(transporterName + count[countName] + '/tasks'), namedNode(transporterName + count[countName])),
        quad(namedNode(transporterName + count[countName] + '/tasks'), namedNode(rdf + 'type'), namedNode(ldp + 'OrderedContainer'), namedNode(transporterName + count[countName] + '/tasks')),
        quad(namedNode(transporterName + count[countName] + '/tasks'), namedNode(rdf + 'type'), namedNode(arena + 'TaskContainer'), namedNode(transporterName + count[countName] + '/tasks')),
        quad(namedNode(transporterName + count[countName] + '/tasks'), namedNode(ldp + 'membershipResource'), namedNode(transporterName + count[countName]), namedNode(transporterName + count[countName] + '/tasks')),
        quad(namedNode(transporterName + count[countName] + '/tasks'), namedNode(ldp + 'hasMemberRelation'), namedNode(arena + 'activeTask'), namedNode(transporterName + count[countName] + '/tasks')),
        quad(namedNode(transporterName + count[countName] + '/tasks'), namedNode(ldp + 'orderContentRelation'), namedNode(arena + 'queuePosition'), namedNode(transporterName + count[countName] + '/tasks')),
        // Direct Container for affordances
        quad(namedNode(transporterName + count[countName]), namedNode(ldp + 'contains'), namedNode(transporterName + count[countName] + '/affordances'), namedNode(transporterName + count[countName])),
        quad(namedNode(transporterName + count[countName] + '/affordances'), namedNode(rdf + 'type'), namedNode(ldp + 'DirectContainer'), namedNode(transporterName + count[countName] + '/affordances')),
        quad(namedNode(transporterName + count[countName] + '/affordances'), namedNode(rdf + 'type'), namedNode(arena + 'AffordanceContainer'), namedNode(transporterName + count[countName] + '/affordances')),
        quad(namedNode(transporterName + count[countName] + '/affordances'), namedNode(ldp + 'membershipResource'), namedNode(transporterName + count[countName]), namedNode(transporterName + count[countName] + '/affordances')),
        quad(namedNode(transporterName + count[countName] + '/affordances'), namedNode(ldp + 'hasMemberRelation'), namedNode(arena + 'affords'), namedNode(transporterName + count[countName] + '/affordances')),
    ]
}

function getRecipe(name, skill, requires, yields, baseProcessingTime, inputProcessingTime, processingTimeVariance) {
    let requiresList = requires.length >= 1 ? requires.map((r) => {
        return [
            quad(namedNode('recipes/' + name), namedNode(arena + 'requiresProducts'), namedNode(arena + r), namedNode('recipes/' + name)),
        ];
    }).reduce((a, b) => a.concat(b), []) : [quad(namedNode('recipes/' + name), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('recipes/' + name))];
    let yieldsList = yields.length >= 1 ? yields.map((r) => {
        return [
            quad(namedNode('recipes/' + name), namedNode(arena + 'yieldsProducts'), namedNode(arena + r), namedNode('recipes/' + name)),
        ];
    }).reduce((a, b) => a.concat(b), []) : [quad(namedNode('recipes/' + name), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'none'), namedNode('recipes/' + name))];
    return [
        quad(namedNode('recipes'), namedNode(ldp + 'contains'), namedNode('recipes/' + name), namedNode('recipes')),
        quad(namedNode('recipes/' + name), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('recipes/' + name)),
        quad(namedNode('recipes/' + name), namedNode(arena + 'requiresSkill'), namedNode(arena + skill), namedNode('recipes/' + name)),
        ...requiresList,
        ...yieldsList,
        quad(namedNode('recipes/' + name), namedNode(arena + 'baseProcessingTime'), literal(baseProcessingTime), namedNode('recipes/' + name)),
        quad(namedNode('recipes/' + name), namedNode(arena + 'inputProcessingTime'), literal(inputProcessingTime), namedNode('recipes/' + name)),
        quad(namedNode('recipes/' + name), namedNode(arena + 'processingTimeVariance'), literal(processingTimeVariance), namedNode('recipes/' + name)),
    ]
}