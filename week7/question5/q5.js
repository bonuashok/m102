// Code to create a collection full of data. Data will be used to test answers in question 5 of the M102 exam.
// mongo --shell localhost/m102 q5.js

/*
Example schema given in the question (with some superhero modifications from me).
{
  _id : …,
  blogdate : ISODate("2008-11-03"),
  votes : 4,
  voters : ['wolverine', 'spider-man', 'hulk', 'thor'],
  comments : [
    { commenter : 'hulk',
      comment : 'hulk smash you',
      flagged:false
    },
    ...
  ]
}
*/

q5 = { };

/*
This script is meant to be run using the "--shell localhost/m102 q5.js" option. This will ensure the script starts
already connected to the m102 database (if the database isn't created it will be created automatically). Throw
an error if the script is connected to any other database.
*/
if( "m102" != db ) {
    print("The 'db' needs to be 'm102' when the shell starts. Terminating.");
    throw "Use m102 db before running script.";
}

// Initialize the m102 database with a collection called q5. Fill the q5 collection with sample superhero data.
q5.init = function() {
    var t = db.q5;
    if( t.count() ) {
        throw "m102.q5 collection is not empty, so won't init(). If you want to reinit, drop the collection first.";
    }
    o = {
        blogdate   : new Date(2014,6,23),
        votes  : 7,
        voters : ['wolverine', 'spider-man', 'hulk', 'thor'],
        comments : [
            {
                commenter : 'hulk',
                comment : 'hulk smash you',
                flagged:false
            },
            {
                commenter : 'spider-man',
                comment : 'this web is for you',
                flagged:true
            },
            {
                commenter : 'wolverine',
                comment : 'need a hand',
                flagged:false
            },
            {
                commenter : 'DocOck',
                comment : 'I need some more arms you think?',
                flagged:true
            }
        ]
    };
    t.insert(o);

    var j = 100;
    for( var i = 1; i < 1000000; i++ ) {
        if( i % 10000 == 0 ) {
            print('Last error: ' + db.getLastError() + ' ' + i);
        }
        if( ++j >= 500 ) j = 100;
        o.blogdate = new Date(2014, 6, 23, 9, i%60, (i/60)%60, (i/3600)%1000),
        o.voters = ['wolverine'+i, 'spider-man'+i, 'hulk'+i, 'thor'+i],
        o.comments = [
            {
                commenter : 'hulk'+i,
                comment : 'hulk smash you',
                flagged:false
            },
            {
                commenter : 'spider-man'+i,
                comment : 'this web is for you',
                flagged:true
            },
            {
                commenter : 'wolverine'+i,
                comment : 'need a hand',
                flagged:false
            },
            {
                commenter : 'DocOck'+i,
                comment : 'I need some more arms you think?',
                flagged:true
            }
        ]
        t.insert(o);
    }
    printjson( db.getLastErrorObj() );
    print("count: " + t.count());
}