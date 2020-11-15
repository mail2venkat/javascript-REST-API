let express = require('express');
let app = express();
let pieRepo = require('./repos/pieRepo')

let router = express.Router(); 
app.use(express.json());

router.get('/', function(req,res,next){
    pieRepo.get(function(data){
        res.status(200).json({
            "status":200,
            "statusText": "OK",
            "message": "All pies retrieved",
            "data": data
        });
    }, function(err){
        next(err);
    })
});

router.get('/search', function(req, res, next){
    let searchObject = {
        "id": req.query.id,
        "name": req.query.name
    };
    pieRepo.search(searchObject,function(data){
        res.status(200).json({
            "status":200,
            "statusText": "OK",
            "message": "All pies retrieved",
            "data": data
        })
    },
    function(err){
        next(err);
    })
})



router.get('/:id', function(req,res,next){
    pieRepo.getById(req.params.id, function(data){
        if(data){
            res.status(200).json({
                "status":200,
                "statusText": "OK",
                "message": "Single pies retrieved",
                "data": data
            });    
        }
        else {
            res.status(404).json({
                "status":404,
                "statusText": "Not Found",
                "message": "The pie '"+ req.params.id + "' could not be found.",
                "error": {
                    "code": "Not Found",
                    "message": "The pie '"+ req.params.id + "' could not be found."
                }
            });
        }
        
    }, function(err){
        next(err);
    })
});

router.post('/', function(req, res, next){
    pieRepo.insert(req.body, function(data){
        res.status(201).json({
            "status":201,
            "statusText": "Created",
            "message": "New pie Added",
            "data": data
        });  
    }, function(err){
        next(err);
    });
})

router.put('/:id', function(req, res, next){
    pieRepo.getById(req.params.id, function(data){
        if(data){
            pieRepo.update(req.body, req.params.id, function(data){
                res.status(200).json({
                    "status":200,
                    "statusText": "OK",
                    "message": "updated",
                    "data": data
                });  
            });
        }
        else {
            res.status(404).json({
                "status":404,
                "statusText": "Not Found",
                "message": "The pie '"+ req.params.id + "' could not be found.",
                "error": {
                    "code": "Not Found",
                    "message": "The pie '"+ req.params.id + "' could not be found."
                }
            }); 
        }
    }, function(err){
        next(err);
    })
})

app.use('/api/', router);

let server = app.listen(5000, function(){
    console.log("listening to 5000");
})