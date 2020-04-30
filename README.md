# Great Query

This is an application that uses BigQuery public dataset for retrieve data as an example demo.

It works as an API with two different versions. The first is just a regular API that handles HTTP request, and the seconde one uses a Websocket connection to retrieve data as a stream.

## Docker

You must define a `.env` file and configure your preferences. There is a `.env.example` file that shows required variables you can add.

`PORT` defined in `.env` file allow you to change the server port. This port is used by the server, but for use with Docker you also need to publish desired port using `-p` parameter on run command.

### Building:
```bash
docker build -t great-query .
```

### Running:

To be able to request Google service, you must have a file with credentials. The applications needs read access to this file, so you have to pass it to Docker container. In order to do this, you have 2 options:

- You can use a volume when running the container:
```bash
docker run --env-file .env -v /absolute/path/to/visitor-account.json:/app/credentials.json -p 5000:5000 -it great-query
```
- You can just name your file `credentials.json` and add it to the project root path. Notice that your `GOOGLE_APPLICATION_CREDENTIALS` variable value in `.env` file must be equal to `/app/credentials.json`. To run the container use this command:
```bash
docker run --env-file .env -p 5000:5000 -it great-query
```
