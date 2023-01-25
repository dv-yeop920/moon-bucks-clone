const BASE_URL = 'http://localhost:3000/api';

const MenuApi = {
    async getAllMenuByCategory(category){
        const response = await fetch(`${BASE_URL}/category/${category}/menu`);
        return response.json();
    },
    async creatMenu(category , menuName){
        const request = await fetch(`${BASE_URL}/category/${category}/menu`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({name: menuName})
    });
    if(!request.ok){
        console.error('에러 발생');
        alert('중복된 메뉴 입니다ㅜㅜ');
    }
    },
    async modifieMenudName(category , modifiedmenuName , menuId){
        const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}` , {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: modifiedmenuName})
        });
        if(!response.ok){
            console.error('에러 발생');
        }
        return response.json();
    },
    async deleteMenuName(category , menuId){
        const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}` , {
            method: 'DELETE',
        });
        if(!response.ok){
            console.error('에러 발생');
        }
    },
    async toggleSoldOutMenu(category , menuId){
        const response = await fetch(`${BASE_URL}/category/${category}/menu/${menuId}/soldOut` , {
            method: 'PUT',
        });
        if(!response.ok){
            console.error('에러 발생');
        }
    }
}

export default MenuApi;