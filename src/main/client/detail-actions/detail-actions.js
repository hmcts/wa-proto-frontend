 function hideShowDetailForGivenId(taskId) {
   let detail = document.getElementById(taskId);

   if (!detail.style || detail.style.display === "" || detail.style.display === "none") {
     detail.style.display = "block";
   } else {
     detail.style.display = "none";
   }
 }


 document.querySelectorAll('details>summary[tasks-type=myTasks]').forEach((detail, index) => {
   detail.addEventListener('click', () => {
     hideShowDetailForGivenId('my-task-action-' + index);
   });
 });

 document.querySelectorAll('details>summary[tasks-type=myAvailableTasks]').forEach((detail, index) => {
   detail.addEventListener('click', () => {
     hideShowDetailForGivenId('my-available-task-' + index);
   });
 });
