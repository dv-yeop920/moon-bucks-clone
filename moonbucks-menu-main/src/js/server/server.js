const BASE_URL = 'http://localhost:3000/api';

const HTTP_METHOD = {
    POST(data){
        return {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        }
    },
    PUT(data){
        return {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify({name: data}) : null
        }
    },
    DELETE(){
        return {
            method:'DELETE',
        }
    }
}


const request = async (url , option) => {
    const response = await fetch( url , option );
    if(!response.ok){
        console.error('에러 발생');
    }
    return response.json();
}

const requestWithOutJson = async (url , option) => {
    const response = await fetch( url , option );
    if(!response.ok){
        console.error('에러 발생');
    }
    return response;
}



const MenuApi = {
    getAllMenuByCategory(category){
        return request(`${BASE_URL}/category/${category}/menu`);
    },

    creatMenu(category , menuName){
        return request(
            `${BASE_URL}/category/${category}/menu`,
            HTTP_METHOD.POST({name: menuName}));
    },

    async modifieMenudName(category , modifiedmenuName , menuId){
        return request(
            `${BASE_URL}/category/${category}/menu/${menuId}`,
            HTTP_METHOD.PUT(modifiedmenuName));
    },

    async deleteMenuName(category , menuId){
        return requestWithOutJson(
            `${BASE_URL}/category/${category}/menu/${menuId}`,
            HTTP_METHOD.DELETE());
    },

    async toggleSoldOutMenu(category , menuId){
        return request(
            `${BASE_URL}/category/${category}/menu/${menuId}/soldOut`,
            HTTP_METHOD.PUT());
    }
}

export default MenuApi;