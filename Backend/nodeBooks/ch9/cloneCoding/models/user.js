const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) {// 공식 문서 참고 
        return super.init({ // pk 생략
            email: {
                type: Sequelize.STRING(40), // 문자열 40개
                allowNull: true, // 
                unitque: true, //
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: true,
            },
            password: {
                type: Sequelize.STRING(100), // 비밀번호를 Hash화 했을 때 대비하여 max 100글자
                allowNull: true,  // 다른 SNS로 로그인시 비밀번호 Null 가능 
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: true,
                defaultValue: 'local', // ex) kakao, naver, github ... 
            },
            snsId: {
                type: Sequelize.STRING(30), // 타 sns 로그인 시 저장용 
                allowNull: true,
            },
        },{
            sequelize,
            timestaps: true, // createdAt, deletedAt, updatedAt
            underscored: false, // 
            modelName: 'User',
            tableName: 'users',
            paranoid: true, // 탈퇴한 회원 복구용(삭제한 척, deletedAt not null 이면 삭제)
            charset: 'utf8', // 한글 적용
            collate: 'utf8_general_ci', // 한글 적용 
        });
    }
    static associate(db){
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
    foreignKey: 'followingId',
        as: 'Followers',
        through: 'Follow',
        });
        db.User.belongsToMany(db.User, {
        foreignKey: 'followerId',
        as: 'Followings',
        through: 'Follow',
        });
    }

}
