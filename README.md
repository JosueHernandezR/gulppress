# Gulppress

**Gulppress** it's driven with _PHP_ for WordPress and powered with _JavaScript_ and _Sass_ to make WP development great again.

## Contents

- [Dependencies](#dependencies)
- [Content](#content)
- [Appendices](#appendices)

---

## Dependencies

![WordPress +5.3.2](https://img.shields.io/badge/WordPress-5.3.2-black.svg)
![Docker +19.03](https://img.shields.io/badge/Docker-+19.03-blue.svg)
![Node +12.16.1](https://img.shields.io/badge/Node-+12.16.1-yellow.svg)
![Sass +4.0](https://img.shields.io/badge/Sass-+4.0-pink.svg)

## Content

### Project Structure

The following diagram shows the project structure of the theme, in the root of the project you will find the PHP templates that **WordPress** needs to work properly, in _src_ you will find the _internals_ and _assets_ folders, the first one has the **gulp.config.js** file and the second one the JS and SCSS that the _gulp_ file will transpile, in _dev_ you will find the _Dockerfiles_ and other configurations to build an appropriate development environment with help of the _docker-compose.yml_, finally the _inc_ folder, it will store all the php files that **WordPress** will use to deploy **Gulppress**.

```bash
.
├── docker-compose.yml              # Docker Compose configuration
├── footer.php
├── header.php
├── index.php
├── style.css
├── package.json                    # Node.js dependencies
├── README.md
├── src
│   ├── assets
│   │   ├── js                      # JS
│   │   │   ├── build.js            # JavaScript entry point
│   │   │   └── ...
│   │   └── scss                    # SCSS
│   │       ├── style.scss          # Scss style entry point
│   │       └── ...
│   └── internals
│           ├── utils
│           │   ├── constanst.js
│           │   └── utils.js
│           └── gulpfile.config.js   # Gulp configuration file
└── dev                              # Development Environment
│   ├── db
│   │   ├── Dockerfile
│   │   ├── my.cnf
│   │   └── wpdb.env
│   └── wp
│       ├── Dockerfile
│       └── wp.env
└── inc
    └── ...
```

### Local Develop

I will asume that you have already installed on your machine _Docker_ and _Docker Compose_, then install _gulp-cli_ globally in your machine:

```bash
yarn global add gulp-cli
```

Then, install the project dependencies:

```bash
yarn install
```

Run the _docker-compose.yml_ file at the root of the project:

```bash
docker-compose up -d --build
```

This command will create the docker images based in the _Dockerfiles_ in the _dev_ folder and will run them in a container as demon.

Once the _wp_ container is launched, execute the following command to open a bash terminal inside the container:

```bash
docker container exec -it wp bash
```

Then, change the _wp-content_ folder owner:

```bash
chown -R www-data:www-data wp-content
```

This will allow you to install plugins and themes in the WP dashboard, if everything it's alright you should see in the browser in _localhost:8000_ the WP onboarding.

Finally, you need to transpile the JavaScript and Sass, wordpress will take the _build.js_ and _styles.css_ from a folder named _dist_, to create thoose files, run:

```bash
yarn start
```

This will execute a _gulp_ task that will be watching for any change in the _src/assets/js_ and _src/assets/scss_ folders and if something change will transpile and store the new code in the _dist_ folder, as I mentioned, our theme will take the styles and scripts from this folder.

### Production Build

To create an optimized production build, run:

```bash
yarn build
```

This will minify assets, bundle and uglify javascript, and compile scss to css.

## Appendices

### Appendix A - VSCode

To have all the development environment automated create a _settings.json_ file inside a _.vscode_ folder in the _root_ of the project with the following configuration:

> settings.json - Enables the _prettier_ and _eslint_ configuration in VS Code.

```json
{
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.formatOnSave": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```
