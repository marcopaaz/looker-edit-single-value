project_name: "helloworld-js"

application: helloworld-js {
  label: "Helloworld (JavaScript)"
  url: "https://localhost:8080/bundle.js"
  entitlements: {
    core_api_methods: ["me"]
  }
}

visualization: {
  id: "helloworld-js"
  label: "Hello World"
  file: "visualizations/hello_world.js"
}
