exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('notes').del()
        .then(function() {
            // Inserts seed entries
            return knex('notes').insert([
                { note: 'This actually works :D', users_id: 1, important: true },
                { note: 'Hey!', users_id: 1, important: false },
                { note: 'Hello', users_id: 2, important: false },
                { note: 'World, cheers', users_id: 2, important: true },
                { note: 'I am Dennis', users_id: 3, important: false },
                { note: 'Knex is fun', users_id: 4, important: false },
            ]);
        });
};