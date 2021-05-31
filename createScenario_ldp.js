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
    quad(namedNode('recipes'), namedNode(ldp + 'contains'), namedNode('mainboardRecipe'), namedNode('recipes')),
    quad(namedNode('recipes/mainboardRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('recipes/mainboardRecipe')),
    quad(namedNode('recipes/mainboardRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'mainboardStorage'), namedNode('recipes/mainboardRecipe')),
    quad(namedNode('recipes/mainboardRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('recipes/mainboardRecipe')),
    quad(namedNode('recipes/mainboardRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'mainboard'), namedNode('recipes/mainboardRecipe')),
    quad(namedNode('recipes/mainboardRecipe'), namedNode(arena + 'baseProcessingTime'), literal(4), namedNode('recipes/mainboardRecipe')),
    quad(namedNode('recipes/mainboardRecipe'), namedNode(arena + 'processingTimeVariance'), literal(1), namedNode('recipes/mainboardRecipe')),
    quad(namedNode('recipes'), namedNode(ldp + 'contains'), namedNode('cpuRecipe'), namedNode('recipes')),
    quad(namedNode('recipes/cpuRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('recipes/cpuRecipe')),
    quad(namedNode('recipes/cpuRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'cpuStorage'), namedNode('recipes/cpuRecipe')),
    quad(namedNode('recipes/cpuRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('recipes/cpuRecipe')),
    quad(namedNode('recipes/cpuRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'cpu'), namedNode('recipes/cpuRecipe')),
    quad(namedNode('recipes/cpuRecipe'), namedNode(arena + 'baseProcessingTime'), literal(5), namedNode('recipes/cpuRecipe')),
    quad(namedNode('recipes/cpuRecipe'), namedNode(arena + 'processingTimeVariance'), literal(1), namedNode('recipes/cpuRecipe')),
    quad(namedNode('recipes'), namedNode(ldp + 'contains'), namedNode('ramRecipe'), namedNode('recipes')),
    quad(namedNode('recipes/ramRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('recipes/ramRecipe')),
    quad(namedNode('recipes/ramRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'memoryStorage'), namedNode('recipes/ramRecipe')),
    quad(namedNode('recipes/ramRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('recipes/ramRecipe')),
    quad(namedNode('recipes/ramRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'ram'), namedNode('recipes/ramRecipe')),
    quad(namedNode('recipes/ramRecipe'), namedNode(arena + 'baseProcessingTime'), literal(3), namedNode('recipes/ramRecipe')),
    quad(namedNode('recipes/ramRecipe'), namedNode(arena + 'processingTimeVariance'), literal(1), namedNode('recipes/ramRecipe')),
    quad(namedNode('recipes'), namedNode(ldp + 'contains'), namedNode('flashMemoryRecipe'), namedNode('recipes')),
    quad(namedNode('recipes/flashMemoryRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('recipes/flashMemoryRecipe')),
    quad(namedNode('recipes/flashMemoryRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'memoryStorage'), namedNode('recipes/flashMemoryRecipe')),
    quad(namedNode('recipes/flashMemoryRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('recipes/flashMemoryRecipe')),
    quad(namedNode('recipes/flashMemoryRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'flashMemory'), namedNode('recipes/flashMemoryRecipe')),
    quad(namedNode('recipes/flashMemoryRecipe'), namedNode(arena + 'baseProcessingTime'), literal(4), namedNode('recipes/flashMemoryRecipe')),
    quad(namedNode('recipes/flashMemoryRecipe'), namedNode(arena + 'processingTimeVariance'), literal(1), namedNode('recipes/flashMemoryRecipe')),
    quad(namedNode('recipes'), namedNode(ldp + 'contains'), namedNode('mainModuleRecipe'), namedNode('recipes')),
    quad(namedNode('recipes/mainModuleRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('recipes/mainModuleRecipe')),
    quad(namedNode('recipes/mainModuleRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'soldering'), namedNode('recipes/mainModuleRecipe')),
    quad(namedNode('recipes/mainModuleRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'cpu'), namedNode('recipes/mainModuleRecipe')),
    quad(namedNode('recipes/mainModuleRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'ram'), namedNode('recipes/mainModuleRecipe')),
    quad(namedNode('recipes/mainModuleRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'flashMemory'), namedNode('recipes/mainModuleRecipe')),
    quad(namedNode('recipes/mainModuleRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'mainboard'), namedNode('recipes/mainModuleRecipe')),
    quad(namedNode('recipes/mainModuleRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'mainModule'), namedNode('recipes/mainModuleRecipe')),
    quad(namedNode('recipes/mainModuleRecipe'), namedNode(arena + 'baseProcessingTime'), literal(6), namedNode('recipes/mainModuleRecipe')),
    quad(namedNode('recipes/mainModuleRecipe'), namedNode(arena + 'inputProcessingTime'), literal(1), namedNode('recipes/mainModuleRecipe')),
    quad(namedNode('recipes/mainModuleRecipe'), namedNode(arena + 'processingTimeVariance'), literal(2), namedNode('recipes/mainModuleRecipe')),
    quad(namedNode('/'), namedNode(ldp + 'contains'), namedNode('stations'), namedNode('/')),
    quad(namedNode('stations'), namedNode(rdf + 'type'), namedNode(ldp + 'BasicContainer'), namedNode('stations')),
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/solderingStation' + count['soldering']), namedNode('stations')),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/solderingStation' + count['soldering'])),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/solderingStation' + count['soldering'])),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/solderingStation' + count['soldering'])),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/solderingStation' + count['soldering'])),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/solderingStation' + count['soldering'])),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(arena + 'skills'), namedNode(arena + 'soldering'), namedNode('stations/solderingStation' + count['soldering'])),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(arena + 'queue'), namedNode('stations/solderingStation' + count['soldering'] + 'TaskQueue'), namedNode('stations/solderingStation' + count['soldering'])),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(arena + 'affordances'), namedNode('stations/solderingStation' + count['soldering'] + 'Affordances'), namedNode('stations/solderingStation' + count['soldering'])),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(arena + 'recipe'), namedNode('mainModuleRecipe'), namedNode('stations/solderingStation' + count['soldering'])),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/solderingStation' + count['soldering'])),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(arena + 'inputPort'), blankNode('soldering' + count['soldering'] + 'input'), namedNode('stations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('stations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('stations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('stations/solderingStation' + count['soldering'])),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(arena + 'outputPort'), blankNode('soldering' + count['soldering'] + 'output'), namedNode('stations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/solderingStation' + count['soldering'])),
                quad(namedNode('stations/solderingStation' + count['soldering']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/solderingStation' + count['soldering'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode('stations')),
                quad(namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'skills'), namedNode(arena + 'memoryStorage'), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'queue'), namedNode('stations/memoryStorageStation' + count['memoryStorage'] + 'TaskQueue'), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'affordances'), namedNode('stations/memoryStorageStation' + count['memoryStorage'] + 'Affordances'), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'recipe'), namedNode('ramRecipe'), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'outputPort'), blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('stations/memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/memoryStorageStation' + count['memoryStorage'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode('stations')),
                quad(namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'skills'), namedNode(arena + 'cpuStorage'), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'queue'), namedNode('stations/cpuStorageStation' + count['cpuStorage'] + 'TaskQueue'), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'affordances'), namedNode('stations/cpuStorageStation' + count['cpuStorage'] + 'Affordances'), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'recipe'), namedNode('cpuRecipe'), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'outputPort'), blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('stations/cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/cpuStorageStation' + count['cpuStorage'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode('stations')),
                quad(namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'skills'), namedNode(arena + 'boardStorage'), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'queue'), namedNode('stations/boardStorageStation' + count['boardStorage'] + 'TaskQueue'), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'affordances'), namedNode('stations/boardStorageStation' + count['boardStorage'] + 'Affordances'), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'recipe'), namedNode('mainboardRecipe'), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'outputPort'), blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/boardStorageStation' + count['boardStorage'])),
                quad(namedNode('stations/boardStorageStation' + count['boardStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/boardStorageStation' + count['boardStorage'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/fixingStation' + count['fixing']), namedNode('stations')),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('fixingStation' + count['fixing'])),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('fixingStation' + count['fixing'])),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('fixingStation' + count['fixing'])),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(arena + 'locationX2'), literal(x2), namedNode('fixingStation' + count['fixing'])),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(arena + 'locationY2'), literal(y2), namedNode('fixingStation' + count['fixing'])),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(arena + 'skills'), namedNode(arena + 'fixing'), namedNode('fixingStation' + count['fixing'])),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(arena + 'queue'), namedNode('fixingStation' + count['fixing'] + 'TaskQueue'), namedNode('fixingStation' + count['fixing'])),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(arena + 'affordances'), namedNode('fixingStation' + count['fixing'] + 'Affordances'), namedNode('fixingStation' + count['fixing'])),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(arena + 'recipe'), namedNode('mainModuleWithPortsRecipe'), namedNode('fixingStation' + count['fixing'])),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('fixingStation' + count['fixing'])),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(arena + 'inputPort'), blankNode('fixing' + count['fixing'] + 'input'), namedNode('fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('fixingStation' + count['fixing'])),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(arena + 'outputPort'), blankNode('fixing' + count['fixing'] + 'output'), namedNode('fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('fixingStation' + count['fixing'])),
                quad(blankNode('fixing' + count['fixing'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('fixingStation' + count['fixing'])),
                quad(namedNode('fixingStation' + count['fixing']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('fixingStation' + count['fixing'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/portStorageStation' + count['portStorage']), namedNode('stations')),
                quad(namedNode('stations/portStorageStation' + count['portStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(namedNode('stations/portStorageStation' + count['portStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(namedNode('stations/portStorageStation' + count['portStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(namedNode('stations/portStorageStation' + count['portStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(namedNode('stations/portStorageStation' + count['portStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(namedNode('stations/portStorageStation' + count['portStorage']), namedNode(arena + 'skills'), namedNode(arena + 'portStorage'), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(namedNode('stations/portStorageStation' + count['portStorage']), namedNode(arena + 'queue'), namedNode('stations/portStorageStation' + count['portStorage'] + 'TaskQueue'), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(namedNode('stations/portStorageStation' + count['portStorage']), namedNode(arena + 'affordances'), namedNode('stations/portStorageStation' + count['portStorage'] + 'Affordances'), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(namedNode('stations/portStorageStation' + count['portStorage']), namedNode(arena + 'recipe'), namedNode('microUSBRecipe'), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(namedNode('stations/portStorageStation' + count['portStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(namedNode('stations/portStorageStation' + count['portStorage']), namedNode(arena + 'outputPort'), blankNode('portStorage' + count['portStorage'] + 'output'), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(blankNode('portStorage' + count['portStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(blankNode('portStorage' + count['portStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(blankNode('portStorage' + count['portStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(blankNode('portStorage' + count['portStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/portStorageStation' + count['portStorage'])),
                quad(namedNode('stations/portStorageStation' + count['portStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/portStorageStation' + count['portStorage'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode('stations')),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'skills'), namedNode(arena + 'metalCasting'), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'queue'), namedNode('stations/metalCastingStation' + count['metalCasting'] + 'TaskQueue'), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'affordances'), namedNode('stations/metalCastingStation' + count['metalCasting'] + 'Affordances'), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'recipe'), namedNode('metalCaseRecipe'), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'inputPort'), blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'outputPort'), blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/metalCastingStation' + count['metalCasting'])),
                quad(namedNode('stations/metalCastingStation' + count['metalCasting']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/metalCastingStation' + count['metalCasting'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode('stations')),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'skills'), namedNode(arena + 'plasticCasting'), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'queue'), namedNode('stations/plasticCastingStation' + count['plasticCasting'] + 'TaskQueue'), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'affordances'), namedNode('stations/plasticCastingStation' + count['plasticCasting'] + 'Affordances'), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'recipe'), namedNode('plasticCaseRecipe'), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'inputPort'), blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'outputPort'), blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('stations/plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/plasticCastingStation' + count['plasticCasting'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode('stations')),
                quad(namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'skills'), namedNode(arena + 'metalStorage'), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'queue'), namedNode('stations/metalStorageStation' + count['metalStorage'] + 'TaskQueue'), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'affordances'), namedNode('stations/metalStorageStation' + count['metalStorage'] + 'Affordances'), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'recipe'), namedNode('metalRecipe'), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'outputPort'), blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/metalStorageStation' + count['metalStorage'])),
                quad(namedNode('stations/metalStorageStation' + count['metalStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/metalStorageStation' + count['metalStorage'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode('stations')),
                quad(namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'skills'), namedNode(arena + 'plasticStorage'), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'queue'), namedNode('stations/plasticStorageStation' + count['plasticStorage'] + 'TaskQueue'), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'affordances'), namedNode('stations/plasticStorageStation' + count['plasticStorage'] + 'Affordances'), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'recipe'), namedNode('plasticRecipe'), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'outputPort'), blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('stations/plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/plasticStorageStation' + count['plasticStorage'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/boltingStation' + count['bolting']), namedNode('stations')),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/boltingStation' + count['bolting'])),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/boltingStation' + count['bolting'])),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/boltingStation' + count['bolting'])),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/boltingStation' + count['bolting'])),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/boltingStation' + count['bolting'])),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(arena + 'skills'), namedNode(arena + 'bolting'), namedNode('stations/boltingStation' + count['bolting'])),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(arena + 'queue'), namedNode('stations/boltingStation' + count['bolting'] + 'TaskQueue'), namedNode('stations/boltingStation' + count['bolting'])),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(arena + 'affordances'), namedNode('stations/boltingStation' + count['bolting'] + 'Affordances'), namedNode('stations/boltingStation' + count['bolting'])),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(arena + 'recipe'), namedNode('caseWithMainModuleRecipe'), namedNode('stations/boltingStation' + count['bolting'])),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/boltingStation' + count['bolting'])),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(arena + 'inputPort'), blankNode('bolting' + count['bolting'] + 'input'), namedNode('stations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('stations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('stations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('stations/boltingStation' + count['bolting'])),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(arena + 'outputPort'), blankNode('bolting' + count['bolting'] + 'output'), namedNode('stations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/boltingStation' + count['bolting'])),
                quad(namedNode('stations/boltingStation' + count['bolting']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/boltingStation' + count['bolting'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode('stations')),
                quad(namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'skills'), namedNode(arena + 'communicationStorage'), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'queue'), namedNode('stations/communicationStorageStation' + count['communicationStorage'] + 'TaskQueue'), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'affordances'), namedNode('stations/communicationStorageStation' + count['communicationStorage'] + 'Affordances'), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'recipe'), namedNode('wifiRecipe'), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'outputPort'), blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('stations/communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/communicationStorageStation' + count['communicationStorage'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode('stations')),
                quad(namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'skills'), namedNode(arena + 'sensorStorage'), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'queue'), namedNode('stations/sensorStorageStation' + count['sensorStorage'] + 'TaskQueue'), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'affordances'), namedNode('stations/sensorStorageStation' + count['sensorStorage'] + 'Affordances'), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'recipe'), namedNode('cameraRecipe'), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'outputPort'), blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('stations/sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/sensorStorageStation' + count['sensorStorage'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode('stations')),
                quad(namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'skills'), namedNode(arena + 'batteryCellStorage'), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'queue'), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'] + 'TaskQueue'), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'affordances'), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'] + 'Affordances'), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'recipe'), namedNode('batteryCellRecipe'), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'outputPort'), blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/batteryCellStorageStation' + count['batteryCellStorage'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/combiningStation' + count['combining']), namedNode('stations')),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/combiningStation' + count['combining'])),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/combiningStation' + count['combining'])),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/combiningStation' + count['combining'])),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/combiningStation' + count['combining'])),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/combiningStation' + count['combining'])),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(arena + 'skills'), namedNode(arena + 'combining'), namedNode('stations/combiningStation' + count['combining'])),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(arena + 'queue'), namedNode('stations/combiningStation' + count['combining'] + 'TaskQueue'), namedNode('stations/combiningStation' + count['combining'])),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(arena + 'affordances'), namedNode('stations/combiningStation' + count['combining'] + 'Affordances'), namedNode('stations/combiningStation' + count['combining'])),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(arena + 'recipe'), namedNode('batteryRecipe'), namedNode('stations/combiningStation' + count['combining'])),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/combiningStation' + count['combining'])),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(arena + 'inputPort'), blankNode('combining' + count['combining'] + 'input'), namedNode('stations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('stations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('stations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('stations/combiningStation' + count['combining'])),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(arena + 'outputPort'), blankNode('combining' + count['combining'] + 'output'), namedNode('stations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/combiningStation' + count['combining'])),
                quad(namedNode('stations/combiningStation' + count['combining']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/combiningStation' + count['combining'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/combiningStation' + count['combining']), namedNode('stations')),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'locationX2'), literal(x2), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'locationY2'), literal(y2), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'skills'), namedNode(arena + 'gluing'), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'queue'), namedNode('gluingStation' + count['gluing'] + 'TaskQueue'), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'affordances'), namedNode('gluingStation' + count['gluing'] + 'Affordances'), namedNode('gluingStation' + count['gluing'])),
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'recipe'), namedNode('smartphoneRecipe'), namedNode('gluingStation' + count['gluing'])),
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
                quad(namedNode('gluingStation' + count['gluing']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('gluingStation' + count['gluing'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/deliveryStation' + count['delivery']), namedNode('stations')),
                quad(namedNode('stations/deliveryStation' + count['delivery']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(namedNode('stations/deliveryStation' + count['delivery']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(namedNode('stations/deliveryStation' + count['delivery']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(namedNode('stations/deliveryStation' + count['delivery']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(namedNode('stations/deliveryStation' + count['delivery']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(namedNode('stations/deliveryStation' + count['delivery']), namedNode(arena + 'skills'), namedNode(arena + 'delivery'), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(namedNode('stations/deliveryStation' + count['delivery']), namedNode(arena + 'queue'), namedNode('stations/deliveryStation' + count['delivery'] + 'TaskQueue'), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(namedNode('stations/deliveryStation' + count['delivery']), namedNode(arena + 'affordances'), namedNode('stations/deliveryStation' + count['delivery'] + 'Affordances'), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(namedNode('stations/deliveryStation' + count['delivery']), namedNode(arena + 'recipe'), namedNode('deliveryRecipe'), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(namedNode('stations/deliveryStation' + count['delivery']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(namedNode('stations/deliveryStation' + count['delivery']), namedNode(arena + 'inputPort'), blankNode('delivery' + count['delivery'] + 'input'), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(blankNode('delivery' + count['delivery'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(blankNode('delivery' + count['delivery'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(blankNode('delivery' + count['delivery'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(blankNode('delivery' + count['delivery'] + 'input'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/deliveryStation' + count['delivery'])),
                quad(namedNode('stations/deliveryStation' + count['delivery']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/deliveryStation' + count['delivery'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode('stations')),
                quad(namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'skills'), namedNode(arena + 'glasStorage'), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'queue'), namedNode('stations/glasStorageStation' + count['glasStorage'] + 'TaskQueue'), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'affordances'), namedNode('stations/glasStorageStation' + count['glasStorage'] + 'Affordances'), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'recipe'), namedNode('glasRecipe'), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'outputPort'), blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/glasStorageStation' + count['glasStorage'])),
                quad(namedNode('stations/glasStorageStation' + count['glasStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/glasStorageStation' + count['glasStorage'] + 'TaskQueue')),
            ])
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
                quad(namedNode('stations'), namedNode(ldp + 'contains'), namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode('stations')),
                quad(namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'skills'), namedNode(arena + 'lcdStorage'), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'queue'), namedNode('stations/lcdStorageStation' + count['lcdStorage'] + 'TaskQueue'), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'affordances'), namedNode('stations/lcdStorageStation' + count['lcdStorage'] + 'Affordances'), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'recipe'), namedNode('lcdRecipe'), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'outputPort'), blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('stations/lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('stations/lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('stations/lcdStorageStation' + count['lcdStorage'] + 'TaskQueue')),
            ])
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
                quad(namedNode('transporters/slowTransporter' + count['slowTransporter']), namedNode(arena + 'queue'), namedNode('transporters/slowTransporter' + count['slowTransporter'] + 'TaskQueue'), namedNode('transporters/slowTransporter' + count['slowTransporter'])),
                quad(namedNode('transporters/slowTransporter' + count['slowTransporter']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('transporters/slowTransporter' + count['slowTransporter'] + 'TaskQueue')),
            ])
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
                quad(namedNode('transporters/fastTransporter' + count['fastTransporter']), namedNode(arena + 'queue'), namedNode('transporters/fastTransporter' + count['fastTransporter'] + 'TaskQueue'), namedNode('transporters/fastTransporter' + count['fastTransporter'])),
                quad(namedNode('transporters/fastTransporter' + count['fastTransporter']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('transporters/fastTransporter' + count['fastTransporter'] + 'TaskQueue')),
            ])
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