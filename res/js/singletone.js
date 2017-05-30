// var singletone = class Singletone {
//     constructor(singletonType) {
//         if (singletone.caller != singletone.getInstance) {
//             throw new Error('This object cannot be instanciated');
//         }
//
//         this.instance = {};
//         this.getInstance = this.getInstance.bind(this);
//         this.getSingletonType = this.getSingletonType.bind(this);
//     }
//
//     getInstance(singletonType) {
//         if (this.instance[singletonType] == null) {
//             this.instance[singletonType] = new singletone(singletonType);
//         }
//         return this.instance[singletonType];
//     }
//
//     getSingletonType(instance) {
//         for (var key in this.instance) {
//             if (this.instance[key] == instance) {
//                 return key;
//             }
//         }
//
//         return null;
//     }
//
//     isValid(singletonType) {
//         return (this.instance[singletonType] != null);
//     }
// }

// singleton.js
var singletone = function(singletonType) {
    console.log("constructor")
    if (singletone.caller != singletone.getInstance) {
        throw new Error('This object cannot be instanciated');
    }
};

singletone.instance = {};

singletone.getInstance = function(singletonType) {
    if (this.instance[singletonType] == null) {
        this.instance[singletonType] = new singletone(singletonType);
    }
    return this.instance[singletonType];
};

singletone.getSingletonType = function(instance) {
    for (var key in this.instance) {
        if (this.instance[key] == instance) {
            return key;
        }
    }

    return null;
}

singletone.isValid = function(singletonType) {
    return (this.instance[singletonType] != null);
}

module.exports = singletone;
