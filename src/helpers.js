function ensurePadding(count) {
    return (count < 10 ? `0${count}` : count);
}

function showTime(hours, minutes, seconds) {
    return `${ensurePadding(hours)}:${ensurePadding(minutes)}:${ensurePadding(seconds)}`;
}

function updateCurrentTask(currentTask, updatedTask) {
    currentTask.id = updatedTask.id;
    currentTask.title = updatedTask.title;
    currentTask.hours = updatedTask.hours;
    currentTask.minutes = updatedTask.minutes;
    currentTask.seconds = updatedTask.seconds;
    currentTask.time = updatedTask.time;
    currentTask.nextTask = updatedTask.nextTask;
    currentTask.audioFile = updatedTask.audioFile;

    return currentTask;
}

module.exports = {
    showTime,
    updateCurrentTask,    
};