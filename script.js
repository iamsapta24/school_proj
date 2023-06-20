
// Get references to the select inputs
const groupSelect = document.getElementById("group-select");
const assignmentTableBody = document.getElementById("assignment-table-body");

// Define assetData as a global variable
var assetData = [
  {
    group: "Group 1",
    systems: [
      {
        name: "Source",
        source: "SupplyGroup01.csv",
        demand: "DemandGroup01.csv",
      },
      {
        name: "Demand",
        source: "DemandGroup01.csv",
        demand: "demand1b.txt",
      },
    ],
  },
  {
    group: "Group 2",
    systems: [
      {
        name: "Source",
        source: "Your first line and downloadable source2.txt",
        demand: "demand2a.txt",
      },
      {
        name: "Demand",
        source: "Your first line and downloadable source2.txt",
        demand: "demand2b.txt",
      },
    ],
  },
];

// Add an event listener to the group select input
groupSelect.addEventListener("change", (event) => {
  const selectedGroup = assetData.find(
    (group) => group.group === event.target.value
  );

  if (selectedGroup) {
    // Clear the existing table body
    assignmentTableBody.innerHTML = "";

    // Populate the table body with data for the selected group
    selectedGroup.systems.forEach((system) => {
      const row = document.createElement("tr");

      const sourceDemandCell = document.createElement("td");
      sourceDemandCell.textContent = system.name;
      row.appendChild(sourceDemandCell);

      const fileCell = document.createElement("td");
      const fileLink = document.createElement("a");
      fileLink.textContent = "SupplyGroup01.csv";
      fileLink.href = "#";
      fileLink.addEventListener("click", (e) => {
        e.preventDefault();
        // fetch(system.supply)
        fetch(system.supply)
        .then((response) => response.text())
        .then((content) => {
          const lines = content.split("\n").slice(0,5).join("\n");
          // downloadFakeFile(system.supply, lines, "text/plain");
          downloadFakeFile(downloadLink.textContent, lines, "text/plain");

        })
        .catch((error) => console.log(error));
      });
      //   var fakeTXT = "This is a fake text file.";
      //   downloadFakeFile(system.source, fakeTXT, "text/plain");
      // });
      fileLink.target = "_blank";
      fileCell.appendChild(fileLink);
      row.appendChild(fileCell);

      const downloadCell = document.createElement("td");
      const downloadLink = document.createElement("a");
      // downloadLink.textContent = "Downloadable CSV file";
      downloadLink.textContent = "DemandGroup01.csv";
      downloadLink.href = "#";
      downloadLink.addEventListener("click", (e) => {
        e.preventDefault();
        fetch(system.demand)
        .then((response) => response.text())
        .then((content) => {
          const lines = content.split("\n").slice(0,5).join("\n");
          downloadFakeFile(downloadLink.textContent, lines, "text/plain");
        })
        .catch((error) => console.log(error));
        // var fakeCSV = "This is a fake csv file.";
        // downloadFakeFile(downloadLink.textContent, fakeCSV, "text/csv");
      });
      // downloadLink.download = `source_${system.name}.txt`;
      downloadCell.appendChild(downloadLink);
      row.appendChild(downloadCell);

      assignmentTableBody.appendChild(row);
    });
  }
});

// Function to download a fake file
function downloadFakeFile(filename, content, fileType) {
  var element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:" + fileType + ";charset=utf-8," + encodeURIComponent(content)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
