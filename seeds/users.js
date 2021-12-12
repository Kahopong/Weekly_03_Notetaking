exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function() {
            // Inserts seed entries
            return knex('users').insert([
                { username: 'sam', password: '12345' },
                { username: 'tester', password: 'abcde' },
                { username: 'dennis', password: 'password' },
                { username: 'alina', password: 'lesley' }
            ]);
        });
};