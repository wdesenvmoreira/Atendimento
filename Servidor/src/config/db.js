// arquivo com as configurações do banco de dados
export const DB = {
    database: "DBSalao",
    username: "",
    password: "",
    params: {
        dialect: 'sqlite',
        storage: 'DBSalao.sqlite',
        define: {
            underscored: true
        },
        logging: false
    }
}