const bodyParser = require("body-parser"); //prmite o req.body (puxar arquivos de inputs/forms do html)
const express = require("express"); //adiciona a biblioteca express, que a resposalvel pelas rotas 
const app = express(); //armazena a biblioteca express na variavel app para permitir ser usada como função
const connection = require('./databases/database'); // puxa a conexão com o mysql
const Question = require("./databases/Questions"); 
const QuestionModel = require('./databases/Questions'); //puxa conexão com a tabela de perguntas da database
const AnswerModel = require('./databases/Anwers'); //puxa conexão com a tabela de respostas da database


connection   //avisa se conseguiu conectar no mysql
    .authenticate()
    .then(() => {
        console.log("a conexão com o banco de dados foi um sucesso")
    })
    .catch((msgErro) => {
        console.log(msgErro)
    })


app.set("view engine","ejs"); //interpreta ejs 
app.use(express.static('public')); //pega fotos/ css

app.use(bodyParser.urlencoded({extended: false})); //permite o req.body
app.use(bodyParser.json()); //permite a req de arquivos jason

app.get("/",(req,res) => { // na rota "/" ele executa a função
    QuestionModel.findAll({raw : true, order:[
        ['id','DESC']
    ]}).then(questions  => {
        res.render('index',{
            questions: questions
        });
    })
    

});


app.get("/ask_questions",(req,res) => { 

    res.render('ask_questions'); //renderiza uma pasta ejs

});
 
app.post("/savequestion",(req,res) => {
    let title = req.body.title;   
    let descrition = req.body.descrition;
   
    QuestionModel.create({ 
        title: title,
        the_question: descrition
    }).then(() => {
        res.redirect('/')
    })
});

app.get("/question/:id",(req,res) => {
    let id = req.params.id;
    QuestionModel.findOne({
        where: {id: id}
    }).then(question => {
        if(question != undefined){

            AnswerModel.findAll({
                where: {answer_id: id},
                order: [ 
                    ['id','DESC']
                ]
            }).then(answers => {
                res.render('question_page',{
                    question:question,
                    answers: answers
                });
            })            
        }
        else{
            res.redirect('/');
        }
    });
});



app.post("/allAnswers",(req,res) =>{
    let answer_text = req.body.answer_text;
    let answer_id = req.body.question_id;
    AnswerModel.create({
        answer_text: answer_text,
        answer_id: answer_id
    }).then(() => {
        res.redirect('/question/' + answer_id)
    });
}); 


app.listen(8000,() => {console.log("o site está rodando")});