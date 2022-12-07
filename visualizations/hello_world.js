looker.plugins.visualizations.add({
  // Id and Label are legacy properties that no longer have any function besides documenting
  // what the visualization used to have. The properties are now set via the manifest
  // form within the admin/visualizations page of Looker
  id: "hello_world",
  label: "Hello World",
  options: {
    font_size: {
      type: "string",
      label: "Font Size",
      values: [
        {"X-Small": "x-small"},
        {"Small": "small"},
        {"Medium": "medium"},
        {"Large": "large"},
        {"X-Large": "x-large"}
      ],
      display: "radio",
      default: "small"
    },

    font_family: {
      type: "string",
      label: "Font Family",
      values: [
        {"Helvetica": "helvetica"},
        {"Sans-Serif": "sans-serif"}
      ],
      display: "radio",
      default: "helvetica"
    }
  },
  // Set up the initial state of the visualization
  create: function(element, config) {

    var font = config.font_number.toString() + "px";
    console.log(font);
    // Insert a <style> tag with some styles we'll use later.
    element.innerHTML = `
      <style>
        .hello-world-vis {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: center;
        }
        .hello-world-option1 {
          font-size: 12px;
          font-family: Helvetica;
        }
        .hello-world-option2 {
          font-size: 12px;
          font-family: Tahoma;
        }
        .hello-world-option3 {
          font-size: 240px;
          font-family: Helvetica;
        }
        .hello-world-option4 {
          font-size: 240px;
          font-family: Tahoma;
        }
      </style>
    `;

    // Create a container element to let us center the text.
    var container = element.appendChild(document.createElement("div"));
    container.className = "hello-world-vis";

    // Create an element to contain the text.
    this._textElement = container.appendChild(document.createElement("div"));

  },
  // Render in response to the data or settings changing
  updateAsync: function(data, element, config, queryResponse, details, done) {

    // Clear any errors from previous updates
    this.clearErrors();

    // Throw some errors and exit if the shape of the data isn't what this chart needs
    if (queryResponse.fields.dimensions.length == 0) {
      this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
      return;
    }

    // Grab the first cell of the data
    var firstRow = data[0];
    var firstCell = firstRow[queryResponse.fields.dimensions[0].name];

    // Insert the data into the page
    this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);

    // Set the size to the user-selected size
    if (config.font_number == "x-small" && config.font_family == "helvetica") {
      this._textElement.className = "hello-world-option1";
    } else if (config.font_number == "x-small" && config.font_family == "sans-serif") {
      this._textElement.className = "hello-world-option2";
    } else if (config.font_number == "small" && config.font_family == "helvetica") {
      this._textElement.className = "hello-world-option3";
    } else {
      this._textElement.className = "hello-world-option4";
    }

    // We are done rendering! Let Looker know.
    done()
  }
});
