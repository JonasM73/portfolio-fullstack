var builder = DistributedApplication.CreateBuilder(args);

var authApi = builder.AddProject<Projects.Portfolio_Auth_Api>("auth-api");

var profileApi = builder.AddProject<Projects.Portfolio_Profile_Api>("profile-api");

var projectsApi = builder.AddProject<Projects.Portfolio_Projects_Api>("projects-api");

var contactApi = builder.AddProject<Projects.Portfolio_Contact_Api>("contact-api");

builder.AddProject<Projects.Portfolio_Gateway>("gateway")
    .WithExternalHttpEndpoints()
    .WithReference(authApi)
    .WithReference(profileApi)
    .WithReference(projectsApi)
    .WithReference(contactApi);

builder.AddNpmApp(
        name: "portfolio-front",
        workingDirectory: "../portfolio-front",
        scriptName: "dev"
    )
    .WithHttpEndpoint(
        name: "http",
        env: "PORT"
    )
    .WithExternalHttpEndpoints();
    
builder.Build().Run();