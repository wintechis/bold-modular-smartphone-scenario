const N3 = require('n3');
const { DataFactory } = N3;
const { blankNode, namedNode, literal, quad } = DataFactory;
const fs = require('fs');

const rdf = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#'
const arena = 'http://arena2036.example.org/'
const xsd = 'http://www.w3.org/2001/XMLSchema#'

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
    quad(namedNode('mainboardRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('/')),
    quad(namedNode('mainboardRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('mainboardRecipe')),
    quad(namedNode('mainboardRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'mainboardStorage'), namedNode('mainboardRecipe')),
    quad(namedNode('mainboardRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('mainboardRecipe')),
    quad(namedNode('mainboardRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'mainboard'), namedNode('mainboardRecipe')),
    quad(namedNode('mainboardRecipe'), namedNode(arena + 'baseProcessingTime'), literal(4), namedNode('mainboardRecipe')),
    quad(namedNode('mainboardRecipe'), namedNode(arena + 'processingTimeVariance'), literal(1), namedNode('mainboardRecipe')),
    quad(namedNode('cpuRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('/')),
    quad(namedNode('cpuRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('cpuRecipe')),
    quad(namedNode('cpuRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'cpuStorage'), namedNode('cpuRecipe')),
    quad(namedNode('cpuRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('cpuRecipe')),
    quad(namedNode('cpuRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'cpu'), namedNode('cpuRecipe')),
    quad(namedNode('cpuRecipe'), namedNode(arena + 'baseProcessingTime'), literal(5), namedNode('cpuRecipe')),
    quad(namedNode('cpuRecipe'), namedNode(arena + 'processingTimeVariance'), literal(1), namedNode('cpuRecipe')),
    quad(namedNode('ramRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('/')),
    quad(namedNode('ramRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('ramRecipe')),
    quad(namedNode('ramRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'memoryStorage'), namedNode('ramRecipe')),
    quad(namedNode('ramRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('ramRecipe')),
    quad(namedNode('ramRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'ram'), namedNode('ramRecipe')),
    quad(namedNode('ramRecipe'), namedNode(arena + 'baseProcessingTime'), literal(3), namedNode('ramRecipe')),
    quad(namedNode('ramRecipe'), namedNode(arena + 'processingTimeVariance'), literal(1), namedNode('ramRecipe')),
    quad(namedNode('flashMemoryRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('/')),
    quad(namedNode('flashMemoryRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('flashMemoryRecipe')),
    quad(namedNode('flashMemoryRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'memoryStorage'), namedNode('flashMemoryRecipe')),
    quad(namedNode('flashMemoryRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'none'), namedNode('flashMemoryRecipe')),
    quad(namedNode('flashMemoryRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'flashMemory'), namedNode('flashMemoryRecipe')),
    quad(namedNode('flashMemoryRecipe'), namedNode(arena + 'baseProcessingTime'), literal(4), namedNode('flashMemoryRecipe')),
    quad(namedNode('flashMemoryRecipe'), namedNode(arena + 'processingTimeVariance'), literal(1), namedNode('flashMemoryRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('/')),
    quad(namedNode('mainModuleRecipe'), namedNode(rdf + 'type'), namedNode(arena + 'Recipe'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'requiresSkill'), namedNode(arena + 'soldering'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'cpu'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'ram'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'flashMemory'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'requiresProducts'), namedNode(arena + 'mainboard'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'yieldsProducts'), namedNode(arena + 'mainModule'), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'baseProcessingTime'), literal(6), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'inputProcessingTime'), literal(1), namedNode('mainModuleRecipe')),
    quad(namedNode('mainModuleRecipe'), namedNode(arena + 'processingTimeVariance'), literal(2), namedNode('mainModuleRecipe')),
])

scenario.forEach(element => {
    switch(element.type) {
        case 'shopfloor':
            store.addQuads([
                quad(namedNode('shopfloor'), namedNode(rdf + 'type'), namedNode(arena + 'Shopfloor'), namedNode('/')),
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
                quad(namedNode('solderingStation' + count['soldering']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'locationX2'), literal(x2), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'locationY2'), literal(y2), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'skills'), namedNode(arena + 'soldering'), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'queue'), namedNode('solderingStation' + count['soldering'] + 'TaskQueue'), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'affordances'), namedNode('solderingStation' + count['soldering'] + 'Affordances'), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'recipe'), namedNode('mainModuleRecipe'), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'inputPort'), blankNode('soldering' + count['soldering'] + 'input'), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'outputPort'), blankNode('soldering' + count['soldering'] + 'output'), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('solderingStation' + count['soldering'])),
                quad(blankNode('soldering' + count['soldering'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('solderingStation' + count['soldering'])),
                quad(namedNode('solderingStation' + count['soldering']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('solderingStation' + count['soldering'] + 'TaskQueue')),
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
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'skills'), namedNode(arena + 'memoryStorage'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'queue'), namedNode('memoryStorageStation' + count['memoryStorage'] + 'TaskQueue'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'affordances'), namedNode('memoryStorageStation' + count['memoryStorage'] + 'Affordances'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'recipe'), namedNode('ramRecipe'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'outputPort'), blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(blankNode('memoryStorage' + count['memoryStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('memoryStorageStation' + count['memoryStorage'])),
                quad(namedNode('memoryStorageStation' + count['memoryStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('memoryStorageStation' + count['memoryStorage'] + 'TaskQueue')),
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
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'skills'), namedNode(arena + 'cpuStorage'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'queue'), namedNode('cpuStorageStation' + count['cpuStorage'] + 'TaskQueue'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'affordances'), namedNode('cpuStorageStation' + count['cpuStorage'] + 'Affordances'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'recipe'), namedNode('cpuRecipe'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'outputPort'), blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(blankNode('cpuStorage' + count['cpuStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('cpuStorageStation' + count['cpuStorage'])),
                quad(namedNode('cpuStorageStation' + count['cpuStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('cpuStorageStation' + count['cpuStorage'] + 'TaskQueue')),
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
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(arena + 'skills'), namedNode(arena + 'boardStorage'), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(arena + 'queue'), namedNode('boardStorageStation' + count['boardStorage'] + 'TaskQueue'), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(arena + 'affordances'), namedNode('boardStorageStation' + count['boardStorage'] + 'Affordances'), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(arena + 'recipe'), namedNode('mainboardRecipe'), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(arena + 'outputPort'), blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(blankNode('boardStorage' + count['boardStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('boardStorageStation' + count['boardStorage'])),
                quad(namedNode('boardStorageStation' + count['boardStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('boardStorageStation' + count['boardStorage'] + 'TaskQueue')),
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
                quad(namedNode('fixingStation' + count['fixing']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
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
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('portStorageStation' + count['portStorage'])),
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('portStorageStation' + count['portStorage'])),
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('portStorageStation' + count['portStorage'])),
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('portStorageStation' + count['portStorage'])),
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('portStorageStation' + count['portStorage'])),
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(arena + 'skills'), namedNode(arena + 'portStorage'), namedNode('portStorageStation' + count['portStorage'])),
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(arena + 'queue'), namedNode('portStorageStation' + count['portStorage'] + 'TaskQueue'), namedNode('portStorageStation' + count['portStorage'])),
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(arena + 'affordances'), namedNode('portStorageStation' + count['portStorage'] + 'Affordances'), namedNode('portStorageStation' + count['portStorage'])),
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(arena + 'recipe'), namedNode('microUSBRecipe'), namedNode('portStorageStation' + count['portStorage'])),
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('portStorageStation' + count['portStorage'])),
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(arena + 'outputPort'), blankNode('portStorage' + count['portStorage'] + 'output'), namedNode('portStorageStation' + count['portStorage'])),
                quad(blankNode('portStorage' + count['portStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('portStorageStation' + count['portStorage'])),
                quad(blankNode('portStorage' + count['portStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('portStorageStation' + count['portStorage'])),
                quad(blankNode('portStorage' + count['portStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('portStorageStation' + count['portStorage'])),
                quad(blankNode('portStorage' + count['portStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('portStorageStation' + count['portStorage'])),
                quad(namedNode('portStorageStation' + count['portStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('portStorageStation' + count['portStorage'] + 'TaskQueue')),
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
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(arena + 'locationX2'), literal(x2), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(arena + 'locationY2'), literal(y2), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(arena + 'skills'), namedNode(arena + 'metalCasting'), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(arena + 'queue'), namedNode('metalCastingStation' + count['metalCasting'] + 'TaskQueue'), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(arena + 'affordances'), namedNode('metalCastingStation' + count['metalCasting'] + 'Affordances'), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(arena + 'recipe'), namedNode('metalCaseRecipe'), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(arena + 'inputPort'), blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(arena + 'outputPort'), blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(blankNode('metalCasting' + count['metalCasting'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('metalCastingStation' + count['metalCasting'])),
                quad(namedNode('metalCastingStation' + count['metalCasting']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('metalCastingStation' + count['metalCasting'] + 'TaskQueue')),
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
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'locationX2'), literal(x2), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'locationY2'), literal(y2), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'skills'), namedNode(arena + 'plasticCasting'), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'queue'), namedNode('plasticCastingStation' + count['plasticCasting'] + 'TaskQueue'), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'affordances'), namedNode('plasticCastingStation' + count['plasticCasting'] + 'Affordances'), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'recipe'), namedNode('plasticCaseRecipe'), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'inputPort'), blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'outputPort'), blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(blankNode('plasticCasting' + count['plasticCasting'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('plasticCastingStation' + count['plasticCasting'])),
                quad(namedNode('plasticCastingStation' + count['plasticCasting']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('plasticCastingStation' + count['plasticCasting'] + 'TaskQueue')),
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
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(arena + 'skills'), namedNode(arena + 'metalStorage'), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(arena + 'queue'), namedNode('metalStorageStation' + count['metalStorage'] + 'TaskQueue'), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(arena + 'affordances'), namedNode('metalStorageStation' + count['metalStorage'] + 'Affordances'), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(arena + 'recipe'), namedNode('metalRecipe'), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(arena + 'outputPort'), blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(blankNode('metalStorage' + count['metalStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('metalStorageStation' + count['metalStorage'])),
                quad(namedNode('metalStorageStation' + count['metalStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('metalStorageStation' + count['metalStorage'] + 'TaskQueue')),
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
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'skills'), namedNode(arena + 'plasticStorage'), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'queue'), namedNode('plasticStorageStation' + count['plasticStorage'] + 'TaskQueue'), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'affordances'), namedNode('plasticStorageStation' + count['plasticStorage'] + 'Affordances'), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'recipe'), namedNode('plasticRecipe'), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'outputPort'), blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(blankNode('plasticStorage' + count['plasticStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('plasticStorageStation' + count['plasticStorage'])),
                quad(namedNode('plasticStorageStation' + count['plasticStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('plasticStorageStation' + count['plasticStorage'] + 'TaskQueue')),
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
                quad(namedNode('boltingStation' + count['bolting']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('boltingStation' + count['bolting'])),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('boltingStation' + count['bolting'])),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('boltingStation' + count['bolting'])),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(arena + 'locationX2'), literal(x2), namedNode('boltingStation' + count['bolting'])),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(arena + 'locationY2'), literal(y2), namedNode('boltingStation' + count['bolting'])),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(arena + 'skills'), namedNode(arena + 'bolting'), namedNode('boltingStation' + count['bolting'])),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(arena + 'queue'), namedNode('boltingStation' + count['bolting'] + 'TaskQueue'), namedNode('boltingStation' + count['bolting'])),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(arena + 'affordances'), namedNode('boltingStation' + count['bolting'] + 'Affordances'), namedNode('boltingStation' + count['bolting'])),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(arena + 'recipe'), namedNode('caseWithMainModuleRecipe'), namedNode('boltingStation' + count['bolting'])),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('boltingStation' + count['bolting'])),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(arena + 'inputPort'), blankNode('bolting' + count['bolting'] + 'input'), namedNode('boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('boltingStation' + count['bolting'])),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(arena + 'outputPort'), blankNode('bolting' + count['bolting'] + 'output'), namedNode('boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('boltingStation' + count['bolting'])),
                quad(blankNode('bolting' + count['bolting'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('boltingStation' + count['bolting'])),
                quad(namedNode('boltingStation' + count['bolting']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('boltingStation' + count['bolting'] + 'TaskQueue')),
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
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'skills'), namedNode(arena + 'communicationStorage'), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'queue'), namedNode('communicationStorageStation' + count['communicationStorage'] + 'TaskQueue'), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'affordances'), namedNode('communicationStorageStation' + count['communicationStorage'] + 'Affordances'), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'recipe'), namedNode('wifiRecipe'), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'outputPort'), blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(blankNode('communicationStorage' + count['communicationStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('communicationStorageStation' + count['communicationStorage'])),
                quad(namedNode('communicationStorageStation' + count['communicationStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('communicationStorageStation' + count['communicationStorage'] + 'TaskQueue')),
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
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'skills'), namedNode(arena + 'sensorStorage'), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'queue'), namedNode('sensorStorageStation' + count['sensorStorage'] + 'TaskQueue'), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'affordances'), namedNode('sensorStorageStation' + count['sensorStorage'] + 'Affordances'), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'recipe'), namedNode('cameraRecipe'), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'outputPort'), blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(blankNode('sensorStorage' + count['sensorStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('sensorStorageStation' + count['sensorStorage'])),
                quad(namedNode('sensorStorageStation' + count['sensorStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('sensorStorageStation' + count['sensorStorage'] + 'TaskQueue')),
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
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'skills'), namedNode(arena + 'batteryCellStorage'), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'queue'), namedNode('batteryCellStorageStation' + count['batteryCellStorage'] + 'TaskQueue'), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'affordances'), namedNode('batteryCellStorageStation' + count['batteryCellStorage'] + 'Affordances'), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'recipe'), namedNode('batteryCellRecipe'), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'outputPort'), blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(blankNode('batteryCellStorage' + count['batteryCellStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('batteryCellStorageStation' + count['batteryCellStorage'])),
                quad(namedNode('batteryCellStorageStation' + count['batteryCellStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('batteryCellStorageStation' + count['batteryCellStorage'] + 'TaskQueue')),
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
                quad(namedNode('combiningStation' + count['combining']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('combiningStation' + count['combining']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('combiningStation' + count['combining'])),
                quad(namedNode('combiningStation' + count['combining']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('combiningStation' + count['combining'])),
                quad(namedNode('combiningStation' + count['combining']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('combiningStation' + count['combining'])),
                quad(namedNode('combiningStation' + count['combining']), namedNode(arena + 'locationX2'), literal(x2), namedNode('combiningStation' + count['combining'])),
                quad(namedNode('combiningStation' + count['combining']), namedNode(arena + 'locationY2'), literal(y2), namedNode('combiningStation' + count['combining'])),
                quad(namedNode('combiningStation' + count['combining']), namedNode(arena + 'skills'), namedNode(arena + 'combining'), namedNode('combiningStation' + count['combining'])),
                quad(namedNode('combiningStation' + count['combining']), namedNode(arena + 'queue'), namedNode('combiningStation' + count['combining'] + 'TaskQueue'), namedNode('combiningStation' + count['combining'])),
                quad(namedNode('combiningStation' + count['combining']), namedNode(arena + 'affordances'), namedNode('combiningStation' + count['combining'] + 'Affordances'), namedNode('combiningStation' + count['combining'])),
                quad(namedNode('combiningStation' + count['combining']), namedNode(arena + 'recipe'), namedNode('batteryRecipe'), namedNode('combiningStation' + count['combining'])),
                quad(namedNode('combiningStation' + count['combining']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('combiningStation' + count['combining'])),
                quad(namedNode('combiningStation' + count['combining']), namedNode(arena + 'inputPort'), blankNode('combining' + count['combining'] + 'input'), namedNode('combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'input'), namedNode(arena + 'capacity'), literal(5), namedNode('combiningStation' + count['combining'])),
                quad(namedNode('combiningStation' + count['combining']), namedNode(arena + 'outputPort'), blankNode('combining' + count['combining'] + 'output'), namedNode('combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('combiningStation' + count['combining'])),
                quad(blankNode('combining' + count['combining'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('combiningStation' + count['combining'])),
                quad(namedNode('combiningStation' + count['combining']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('combiningStation' + count['combining'] + 'TaskQueue')),
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
                quad(namedNode('gluingStation' + count['gluing']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
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
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('deliveryStation' + count['delivery'])),
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('deliveryStation' + count['delivery'])),
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('deliveryStation' + count['delivery'])),
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(arena + 'locationX2'), literal(x2), namedNode('deliveryStation' + count['delivery'])),
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(arena + 'locationY2'), literal(y2), namedNode('deliveryStation' + count['delivery'])),
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(arena + 'skills'), namedNode(arena + 'delivery'), namedNode('deliveryStation' + count['delivery'])),
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(arena + 'queue'), namedNode('deliveryStation' + count['delivery'] + 'TaskQueue'), namedNode('deliveryStation' + count['delivery'])),
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(arena + 'affordances'), namedNode('deliveryStation' + count['delivery'] + 'Affordances'), namedNode('deliveryStation' + count['delivery'])),
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(arena + 'recipe'), namedNode('deliveryRecipe'), namedNode('deliveryStation' + count['delivery'])),
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('deliveryStation' + count['delivery'])),
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(arena + 'inputPort'), blankNode('delivery' + count['delivery'] + 'input'), namedNode('deliveryStation' + count['delivery'])),
                quad(blankNode('delivery' + count['delivery'] + 'input'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('deliveryStation' + count['delivery'])),
                quad(blankNode('delivery' + count['delivery'] + 'input'), namedNode(arena + 'locationX'), literal(inputX), namedNode('deliveryStation' + count['delivery'])),
                quad(blankNode('delivery' + count['delivery'] + 'input'), namedNode(arena + 'locationY'), literal(inputY), namedNode('deliveryStation' + count['delivery'])),
                quad(blankNode('delivery' + count['delivery'] + 'input'), namedNode(arena + 'capacity'), literal(2), namedNode('deliveryStation' + count['delivery'])),
                quad(namedNode('deliveryStation' + count['delivery']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('deliveryStation' + count['delivery'] + 'TaskQueue')),
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
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(arena + 'skills'), namedNode(arena + 'glasStorage'), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(arena + 'queue'), namedNode('glasStorageStation' + count['glasStorage'] + 'TaskQueue'), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(arena + 'affordances'), namedNode('glasStorageStation' + count['glasStorage'] + 'Affordances'), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(arena + 'recipe'), namedNode('glasRecipe'), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(arena + 'outputPort'), blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(blankNode('glasStorage' + count['glasStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('glasStorageStation' + count['glasStorage'])),
                quad(namedNode('glasStorageStation' + count['glasStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('glasStorageStation' + count['glasStorage'] + 'TaskQueue')),
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
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('/')),
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(rdf + 'type'), namedNode(arena + 'Workstation'), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'locationX1'), literal(element['x']), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'locationY1'), literal(element['y']), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'locationX2'), literal(x2), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'locationY2'), literal(y2), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'skills'), namedNode(arena + 'lcdStorage'), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'queue'), namedNode('lcdStorageStation' + count['lcdStorage'] + 'TaskQueue'), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'affordances'), namedNode('lcdStorageStation' + count['lcdStorage'] + 'Affordances'), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'recipe'), namedNode('lcdRecipe'), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'outputPort'), blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode(rdf + 'type'), namedNode(arena + 'Port'), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode(arena + 'locationX'), literal(outputX), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode(arena + 'locationY'), literal(outputY), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(blankNode('lcdStorage' + count['lcdStorage'] + 'output'), namedNode(arena + 'capacity'), literal(2), namedNode('lcdStorageStation' + count['lcdStorage'])),
                quad(namedNode('lcdStorageStation' + count['lcdStorage']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('lcdStorageStation' + count['lcdStorage'] + 'TaskQueue')),
            ])
            count['lcdStorage'] += 1
            break
        }
        case 'slowTransporter':
            store.addQuads([
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(rdf + 'type'), namedNode(arena + 'Transporter'), namedNode('/')),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(rdf + 'type'), namedNode(arena + 'Transporter'), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'locationX'), literal(element['x']), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'locationY'), literal(element['y']), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'speed'), literal(0.5), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'capacity'), literal(4), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'queue'), namedNode('slowTransporter' + count['slowTransporter'] + 'TaskQueue'), namedNode('slowTransporter' + count['slowTransporter'])),
                quad(namedNode('slowTransporter' + count['slowTransporter']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('slowTransporter' + count['slowTransporter'] + 'TaskQueue')),
            ])
            count['slowTransporter'] += 1
            break
        case 'fastTransporter':
            store.addQuads([
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(rdf + 'type'), namedNode(arena + 'Transporter'), namedNode('/')),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(rdf + 'type'), namedNode(arena + 'Transporter'), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'locationX'), literal(element['x']), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'locationY'), literal(element['y']), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'speed'), literal(1), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'status'), namedNode(arena + 'idle'), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'capacity'), literal(2), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'queue'), namedNode('fastTransporter' + count['fastTransporter'] + 'TaskQueue'), namedNode('fastTransporter' + count['fastTransporter'])),
                quad(namedNode('fastTransporter' + count['fastTransporter']), namedNode(arena + 'tasks'), namedNode(rdf + 'nil'), namedNode('fastTransporter' + count['fastTransporter'] + 'TaskQueue')),
            ])
            count['fastTransporter'] += 1
            break
    }
});

const writer = new N3.Writer(fs.createWriteStream(process.argv[2].substring(0, process.argv[2].lastIndexOf('.')) + '.trig'), {
        prefixes: {
            rdf: rdf,
            arena: arena,
            xsd: xsd
    },
    format: 'application/trig'
});
writer.addQuads(store.getQuads(null, null, null, null))
writer.end()