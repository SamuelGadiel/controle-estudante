API de controle do estudante!
=============================

Como usar:
----------

-   ### Alunos

    Endpoint: [/alunos](/alunos)

    -   #### Criar um Aluno

        Para criar um aluno basta passar o "nome" e "idade" como
        parâmetros

        Endpoint:
        [/alunos/criar?nome=Lucas&idade=18](/alunos/criar?nome=Lucas&idade=18)

    -   #### Alterar um Aluno

        Para alterar um aluno basta passar o "nome" do aluno e a nova
        "idade" dele

        Endpoint:
        [/alunos/alterar?nome=Lucas&idade=20](/alunos/alterar?nome=Lucas&idade=20)

    -   #### Adicionar nota a um Aluno

        Para adicioanr uma nota a um aluno deve-se passar o "nome" do
        aluno, a "materia" e a "nota" do aluno nesta matéria

        São permitidas apenas 4 notas por aluno

        Endpoint:
        [/alunos/nota-materia?nome=Lucas&materia=Geografia&nota=60](/alunos/nota-materia?nome=Lucas&materia=Geografia&nota=60)

    -   #### Deletar um Aluno

        Para deletar um aluno basta passar o "nome" do aluno

        Endpoint:
        [/alunos/deletar?nome=Lucas](/alunos/deletar?nome=Lucas)

    -   #### Listar os Alunos

        Este serviço lista todos os alunos cadastrados

        Endpoint: [/alunos/listar](/alunos/listar)

-   ### Disciplinas

    Endpoint: [/disciplinas](/disciplinas)

    -   #### Criar uma Disciplina

        Para criar uma disciplina deve-se passar o "nome" e "professor"
        da disciplina

        Endpoint:
        [/disciplinas/criar?nome=Filosofia&professor=Marcos](/disciplinas/criar?nome=Filosofia&professor=Marcos)

    -   #### Alterar uma Disciplina

        Para alterar uma disciplina deve-se passar o "nome" dela e o
        novo "professor"

        Endpoint:
        [/disciplinas/alterar?nome=Filosofia&professor=Pedro](/disciplinas/alterar?nome=Filosofia&professor=Pedro)

    -   #### Deletar uma Disciplina

        Para deletar uma disciplina deve-se passar apenas o "nome" da
        disciplina

        Endpoint:
        [/disciplinas/deletar?nome=Filosofia](/disciplinas/deletar?nome=Filosofia)

    -   #### Listar as Disciplinas

        Este serviço lista todas as disciplinas cadastradas

        Endpoint: [/disciplinas/listar](/disciplinas/listar)

-   ### Relatório

    Este serviço gera um relatório de todos os alunos e o desempenho em
    cada matéria

    Nota avaliada da forma "60 é 100!"

    Endpoint: [/relatorio](/relatorio)


