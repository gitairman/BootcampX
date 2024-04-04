const { Pool } = require('pg');

const pool = new Pool({
  user: 'development',
  password: 'development',
  host: 'localhost',
  database: 'bootcampx',
});

const [cohort] = process.argv.slice(2);

pool
  .query(
    `
    SELECT DISTINCT teachers.name as teacher, cohorts.name as cohort
    FROM assistance_requests
    JOIN teachers ON teachers.id = teacher_id
    JOIN students ON students.id = student_id
    JOIN cohorts ON cohorts.id = cohort_id
    WHERE cohorts.name = $1;
  `,
    [cohort]
  )
  .then((res) =>
    res.rows.forEach((row) => console.log(`${row.cohort}: ${row.teacher}`))
  )
  .catch((err) => console.error('query error', err.stack));
