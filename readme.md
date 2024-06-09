# PLpgSQL-101

## Overview

This project outlines the steps needed to integrate PLpgSQL functions with SQL and TypeScript code, leveraging Node.js for GitHub Actions for CI/CD processes.

## Getting started

### Prerequisites

Ensure you have `PostgreSQL` installed and configured on your local machine. Familiarity with the `psql` command-line tool is required.

### Installation

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install all the devDependencies using `npm install`

### Setting up the database

### Initialize Database Tables and `PLpgSQL` functions

1. **Create Database Table**

    Run the following command in `psql` to execute the SQl script that creates the necessary table:

    ```psql
    \i sql/tables.sql
    ```

    Verify the table creation by listing all tables:

    ```psql
    \dt
    ```

2. **Create PL/PGSQL functions**

    Execute the script to create the `PlpgSQL` functions:

    ```psql
    \i functions/create_learners.sql
    ```

    Verify the function creation by listing all functions:

    ```psql
    \df
    ```

3. **Insert Data using PL/PGSQL function**

    Add data to the `learner` table using the PL/pgSQL function:

    ```sql
    select * from create_learner('john', 'john@gmail');
    ```

    `PostgreSQL` will respond with `t` if the insertion was successful, indicating true. Otherwise will respond with `f` if the insertion was not successful, indicating false.

### Testing `PLpgSQL` functions integrated with `SQL` and TS using Mocha.js

1. **Create an `Interface` called `ILearner` in a file called `ILearner.ts`**

    ```typescript
    export interface ILearner {
        id?: number;
        name: string;
        email: string;
    }
    ```

2. **Create another `Interface` called `ILearnersImpl` in the same file with `ILearner`**

    `ILearnersImpl` should have the following methods:

    * `ILearnersImpl` should have `createLearner` method to create a learner in the database.
    * `ILearnersImpl` should also have `fetchLearners` method to fetch all the learners in the database.

3. **Create this `test/test.ts` in your project root folder**

    Inside `test.ts` do the following:

    * Import `LearnersImpl` from `./LearnersImpl`.
    * Connect to the database using `pgPromise`.

        ```typescript
        const pgp = pgPromise();
        const config = {
            connectionString: process.env.DB_URL as string,
        };

        const db = pgp(config);
        const learnersImpl = new LearnersImpl(db);
        ```

    * Create tests like the following:

        ```typescript
        describe("LearnersImpl", function () {
            it("should create and fetch a learner", async () => {
                await learnersImpl.createLearner({
                    name: "John",
                    email: "doe@gmail.com"
                });
                let learner = await learnersImpl.fetchLearners();
                assert.deepEqual(
                    {
                        id: 1,
                        name: "John",
                        email: "doe@gmail.com"
                    },
                    learner
                );
            });

            it("should create and fetch more learners", async () => {
                await learnersImpl.createLearner({
                    name: "John",
                    email: "doe@gmail.com"
                });
                let learners = await learnersImpl.fetchLearners();
                assert.equal(1, learners.length);

                await learnersImpl.createLearner({
                    name: "Tom",
                    email: "tommy@gmail.com"
                });
                learners = await learnersImpl.fetchLearners();
                assert.equal(2, learners.length);
            });
        });
        ```

4. **PLpgSQL functions, Typescript, and SQL code integration**

    In your project root folder, create a file called `LearnersImpl.ts`:

    Inside `LearnersImpl.ts` do the following:

    * Import `ILearner` and `ILearnersImpl`.
    * Create a class called, `LearnersImpl` that perform the following:

        * `LearnersImpl` should implement the `ILearnersImpl`.
        * `LearnersImpl` should have a `constructor` that takes in `db` connection from `pgPromise`.
        * `LearnersImpl` should have a method to create learners called, `createLearners`.
        * `LearnersImpl` should also have a method to fetch all the learners called, `fetchLearners`.

    * `createLearners` method should create a learner like the following:

        ```typescript
        async createLearner(): Promise<boolean> {
            const query = "select * from create_learner($1)";
            const results = await this.db.oneOrNone(query, [data]);
            return results;
        };
        ```

### CI/CD with GitHub Actions Workflow

1. **Create a Node.js CI Actions configuration**

    * In your GitHub project, click the `Actions` button
    * Then search for a `Node.js CI` and click on configure
    * Copy and Paste the `Status Badge` in the `readme.md`

2. **Triggering the GitHub Actions Workflow**

    * Ensure the workflow sets up a PostgreSQL service container with the following environment variables:

    ```yaml
    services:
        postgresql:
            image: postgres:latest
            env:
                POSTGRES_USER: <user_name>
                POSTGRES_PASSWORD: <password>
                POSTGRES_DB: <database_name>
            ports:
              - 5432:5432
            options: >-
              --health-cmd pg_isready
              --health-interval 10s
              --health-timeout 5s
              --health-retries 5
    ```

    * Create a file called, `scripts.sql` and add the following command to execute the sql scripts

    ```sql
    \i <sql_file_name>
    ```

    * Execute the SQL scripts with the following commands:

    ```yaml
    steps:
    - uses: actions/checkout@v4
    - name: Install dependencies
      run: npm install
    - name: create postgreSQL tables
      run: PGPASSWORD={password} psql -h localhost -U {user_name} -d {database} -a -f ./scripts.sql
    ```

    * Run tests to ensure the application behaves as expected.

    ```yaml
    - name: run tests with PostgreSQL
      run: npm test
      env:
        DB_URL: postgresql://{user_name}:{password}@localhost:5432/{database_name}
    ```

### Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for any improvements or bug fixes.

### LICENSE

This project is licensed under the MIT License. See the `LICENSE` file for details.
