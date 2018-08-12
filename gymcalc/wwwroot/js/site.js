// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

var weightClasses = [114, 123, 132, 148, 165, 181, 198, 220, 242, 275, 319, 320];

var squatClassWeight = [
[80, 145, 175, 240, 320],
[85, 155, 190, 260, 345],
[90, 170, 205, 280, 370],
[100, 190, 230, 315, 410],
[110, 205, 250, 340, 445],
[120, 220, 270, 370, 480],
[125, 230, 285, 390, 505],
[130, 245, 300, 410, 530],
[135, 255, 310, 425, 550],
[140, 260, 320, 435, 570],
[145, 270, 325, 445, 580],
[150, 275, 330, 455, 595]
];

var benchClassWeight = [
[85, 110, 130, 180, 220],
[90, 115, 140, 195, 240],
[100, 125, 155, 210, 260],
[110, 140, 170, 235, 290],
[120, 150, 185, 255, 320],
[130, 165, 200, 275, 345],
[135, 175, 215, 290, 360],
[140, 185, 225, 305, 380],
[145, 190, 230, 315, 395],
[150, 195, 240, 325, 405],
[155, 200, 245, 335, 415],
[160, 205, 250, 340, 425]
];

var deadliftClassWeight = [
[95, 180, 205, 300, 385],
[105, 195, 220, 320, 415],
[115, 210, 240, 340, 440],
[125, 235, 270, 380, 480],
[135, 255, 295, 410, 520],
[150, 275, 315, 440, 550],
[155, 290, 335, 460, 565],
[165, 305, 350, 480, 585],
[170, 320, 365, 490, 595],
[175, 325, 375, 500, 600],
[180, 335, 380, 505, 610],
[185, 340, 390, 510, 615]
];

var pressClassWeight = [
[55, 75, 90, 110, 130],
[60, 80, 100, 115, 140],
[65, 85, 105, 125, 150],
[70, 95, 120, 140, 170],
[75, 100, 130, 155, 190],
[80, 110, 140, 165, 220],
[85, 115, 145, 175, 235],
[90, 120, 155, 185, 225],
[95, 125, 160, 190, 265],
[95, 130, 165, 195, 275],
[100, 135, 170, 200, 280],
[100, 140, 175, 205, 285]
];

var powerCleanClassWeight = [
[55, 105, 125, 175, 205],
[60, 110, 135, 185, 225],
[65, 120, 150, 200, 240],
[75, 135, 165, 225, 265],
[80, 145, 180, 245, 290],
[85, 160, 195, 265, 310],
[90, 165, 205, 280, 325],
[95, 175, 215, 295, 345],
[100, 185, 225, 305, 355],
[105, 190, 230, 315, 365],
[110, 195, 235, 320, 375],
[115, 200, 240, 330, 385]
];

$('#squat,#body-weight').on("keyup", function (e) {
    var squat = $('#squat').val();
    var weight = $('#body-weight').val();

    if (weight > 114 && weight < 320) {
        var weightClass = getClosestWeightClass(weight);

        console.log('weightClass: ' + weightClass);

        var weightInterpolationFactor = getInterpolationFactor(weightClasses[weightClass], weightClasses[weightClass + 1], weight);

        console.log('weightInterpolationFactor: ' + weightInterpolationFactor);

        var interpolatedSquatClass = applyInterpolationToArrays(squatClassWeight[weightClass], squatClassWeight[weightClass + 1], weightInterpolationFactor);

        console.log('interpolatedSquatClass: + ' + interpolatedSquatClass);

        var squatClass = getClosestSquatClass(squat, interpolatedSquatClass);

        var squatInterpolationFactor = getInterpolationFactor(interpolatedSquatClass[squatClass], interpolatedSquatClass[squatClass + 1], squat);

        
        if (isNaN(squatInterpolationFactor)) {
            resetOutputs();
            return;
        }


        var interpolatedBenchClass = applyInterpolationToArrays(benchClassWeight[weightClass], benchClassWeight[weightClass + 1], weightInterpolationFactor);

        var targetBench = applyInterpolationFactor(interpolatedBenchClass[squatClass], interpolatedBenchClass[squatClass + 1], squatInterpolationFactor);

        $('#bench').val(Math.round(targetBench));



        var interpolatedDeadliftClass = applyInterpolationToArrays(deadliftClassWeight[weightClass], deadliftClassWeight[weightClass + 1], weightInterpolationFactor);

        var targetDeadlift = applyInterpolationFactor(interpolatedDeadliftClass[squatClass], interpolatedDeadliftClass[squatClass + 1], squatInterpolationFactor);

        $('#deadlift').val(Math.round(targetDeadlift));



        var interpolatedPressClass = applyInterpolationToArrays(pressClassWeight[weightClass], pressClassWeight[weightClass + 1], weightInterpolationFactor);

        var targetPress = applyInterpolationFactor(interpolatedPressClass[squatClass], interpolatedPressClass[squatClass + 1], squatInterpolationFactor);

        $('#press').val(Math.round(targetPress));



        var interpolatedPowerCleanClass = applyInterpolationToArrays(powerCleanClassWeight[weightClass], powerCleanClassWeight[weightClass + 1], weightInterpolationFactor);

        var targetPowerClean = applyInterpolationFactor(interpolatedPowerCleanClass[squatClass], interpolatedPowerCleanClass[squatClass + 1], squatInterpolationFactor);

        $('#powerclean').val(Math.round(targetPowerClean));
    } else {
        resetOutputs();
        return;
    }
});

function resetOutputs() {
    $('#bench').val('');
    $('#deadlift').val('');
    $('#press').val('');
    $('#powerclean').val('');
}

function getClosestWeightClass(weight) {
    for (let i = 0; i < weightClasses.length; i++) {
        if (weightClasses[i] > weight) {
            return i - 1;
        }
    }
}

function getClosestSquatClass(squatWeight, classArray) {
    for (let i = 0; i < classArray.length; i++) {
        if (classArray[i] > squatWeight) {
            return i - 1;
        }
    }
}

function getInterpolationFactor(min, max, value){
    return (value - min) / (max - min);
}

function applyInterpolationFactor(min, max, interpolationFactor) {
    var difference = max - min;

    return min + difference * interpolationFactor;
}

function applyInterpolationToArrays(minArray, maxArray, interpolationFactor) { 
    var newArray = [];

    for (let i = 0; i < minArray.length; i++) {
        var interpolatedValue = applyInterpolationFactor(minArray[i], maxArray[i], interpolationFactor);

        newArray.push(interpolatedValue);
    }

    return newArray;
}