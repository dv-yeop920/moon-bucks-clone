
/*
step1 => Todo 서버 요청
[*] 웹 서버를 띄운다
[*] 서버에 새로운 메뉴가 추가될 수 있도록 요청 한다
[*] 서버에 카테고리별 메뉴리스트를 불러 온다
[*] 서버에 메뉴가 수정될 수 있도록 요청 한다
[*] 서버에 메뉴가 삭제될 수 있도록 요청 한다
[*] 서버에 메뉴 상태가 토글될 수 있도록 요청 한다  

step2 => Todo 리팩토링
[*] localstorage 에 저장하는 로직들은 지운다
[*] fetch 비동기 api를 사용 하는 부분을 async , await 를 사용하여 구현 한다

step3 => Todot 사용자 경험
[] api 통신이 실패하는 경우에 대해 사용자가 알 수 있게 alert 로 예외 처리를 한다
[] 중복 되는 메뉴는 추가할수 없게 막는다
*/
const BASE_URL = 'http://localhost:3000/api';

    //html에 접근해서 태그들 변수에 할당 해서 쓰기
    const menuForm = document.querySelector('#espresso-menu-form');
    const userInput = document.querySelector('#espresso-menu-name');
    const userSubmitButton = document.querySelector('#espresso-menu-submit-button');
    const espressoMenuList = document.querySelector('#espresso-menu-list');
    const navigationBar = document.querySelector('#nav');
    const menuCount = document.querySelector('.menu-count');

    //로컬과 화면에 표시해줄 정보를 담을 배열 선언(배열로 초기화 시켜주는 이유는 우리가 invalue를 어떤 데이터 형식으로 받아올지 모르기 때문에
    // 어떤 데이터 형식이든 배열에 push를 해줘서 다른 사람과 작업을 할 때 상태를 배열로 관리를 하는 구나 라는 의도를 알려주기 위해 
    //기존에 하나의 게시판만 관리 하면 돼서 배열로만 했지만 여러개의 카테고리를 관리 하기 위해 객체에 키 값 을 담는 형시으로 저장
let menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: []
};
//메뉴의 키에 접근할 때 쓸 변수 선언 , 기본값은 첫 페이지인 espresso , 다른 카테고리에 접근할 때 마다 값을 변경하여 해당 카테고리에 접근할 수있게 let 으로 선언
let currentCategory = 'espresso';

/*const //setMenu = (menu) => {
    localStorage.setItem('menu' , JSON.stringify(menu));
}//로컬에 정보를 저장해주는  역할을 해준다 


const //getMenu = () => {
    return JSON.parse(localStorage.getItem('menu'));
}*/
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

const init = async () => {
    menu[currentCategory] = await MenuApi.getAllMenuByCategory(currentCategory);
    render();
    userInput.value = '';
};
    /*if(//getMenu()){
        menu = //getMenu();
    }
    render();*/


    //form 태그가 자동으로 전송 되는 것을 막아 준다
    menuForm.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    
    //수정 또는 삭제 했을 때 메뉴 갯수를 카운터 해주는 함수
    const menuCounter = () => {
        const menuCounted = menu[currentCategory].length;
        menuCount.innerText = `총 ${menuCounted}개`;
    }

    const render = () => {
        const template = menu[currentCategory].map((menu , index) => {
        //menu 배열에 메뉴 하나당 객체 하나로 키값이 담긴다 그 배열의 키의 값을 화면에 출력 하고 로컬에 보내준다
        //data 라는건 html 마크업에 어떤 데이터를 저장하고 싶을때 쓰는 표준 속성 , 그 뒤는 개발자에 의도에 의해 필요한 것에 따라 명칭을 정할 수 있다.
        //서버에서 보내준 메뉴의 아이디를 입력 받아 수정 삭제 수정에서 사용 한다
        return `
        <li data-menu-id ="${menu.id}" class = "menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name ${menu.isSoldOut ? "sold-out" : ''} ">
        ${menu.name}
        </span>
        <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
        >
            ${menu.isSoldOut ? "품절 해제" : "품절" }
        </button>
        <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
        >
            수정
        </button>
        <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
        >
            삭제
        </button>
        </li>`
    }).join('');
    espressoMenuList.innerHTML = template;//ul에 맵으로 맵핑해서 등록해준다
    menuCounter(); 
};//새로운 배열로 생성되는 map 의 배열을 스트링으로 풀어 준다

    //엔터나 클릭이 됐을 때 실행될 메뉴 리스트 내용을 담은 함수
    const addMenuList = async () => {
        const userInputValue = userInput.value;
        if(userInput.value === ''){
            return alert('메뉴 이름을 작성해 주세요!');
        }
        //위에 선언된 빈배열인 menu 에 인풋에 입력한 값을 푸쉬한다
        //메뉴를 객체로 바꿨으니 객체의 키에 접근해서 에스프레소 라는 키에 푸쉬 해준다
        //menu[currentCategory].push({name:userInputValue});
        //위에서 선언한 함수 메소드에 인자를 보내주어 요청을 하고 응답을 받아 render 를 실행 시켜 메뉴를 추가 한다
        await MenuApi.creatMenu(currentCategory , userInputValue);
        menu[currentCategory] = await MenuApi.getAllMenuByCategory(currentCategory);
        render();
        userInput.value = '';
        //setMenu(menu);
    }
    
    const updateMenuName = async (event) => {
        //위에 설정해 놓은 data 값을 dataset 이라는 속성으로 활용할 수 있다 . 뒤에는 설정해 놓은 이름 menu-id 를 함수명 작성 하듯이 적어 준다
        const menuId = event.target.closest('li').dataset.menuId;
        const menuName = event.target.closest('li').querySelector('.menu-name');

        if(event.target.classList.contains('menu-edit-button')){
            const modifiedName = prompt('메뉴 수정' , menuName.innerText);

            if(modifiedName){
                //menuId 는 배열의 index 값과 동일하기 때문에 menu의 인덱스에 접근해 해당 name 키에 있는 값을 수정한 값으로 로컬에서 바꿔 준다.
                //menu[currentCategory][menuId] = {name: modifiedName};
                await MenuApi.modifieMenudName(currentCategory , modifiedName , menuId);
                menu[currentCategory] = await MenuApi.getAllMenuByCategory(currentCategory);
                //데이터를 바꿔 줄때는 항상 최소한의 꼬이지 않게 깔끔하게 로직을 짠다 한번에 모든 함수에서 해결 하려 하지 말고 역할을 나눠 준다
                render();
                //setMenu(menu);
            }else{
                menuName.innerText = menuName.innerText;
            }
        }
    }

    const removeMenuName = async (event) => {
        const menuId = event.target.closest('li').dataset.menuId;

        if(confirm('정말 삭제 하시겠습니까?')){
            await MenuApi.deleteMenuName(currentCategory , menuId);
            menu[currentCategory] = await MenuApi.getAllMenuByCategory(currentCategory);
            render();
            //setMenu(menu);
            return;
        }
    }

    const soldOutMenuName = async (event) => {
        const menuId = event.target.closest('li').dataset.menuId;
        await MenuApi.toggleSoldOutMenu(currentCategory , menuId);
        menu[currentCategory] = await MenuApi.getAllMenuByCategory(currentCategory);
        render();
        
        //menu[currentCategory][menuId].soldOut = menu[currentCategory][menuId].soldOut  === true ? false : true;
        //setMenu(menu);
    }

    //Enter 키를 눌렀을 때 userInput 에 입력된 value 를 출력
    userInput.addEventListener('keypress' , (event) => {
        if(event.key === 'Enter'){
            addMenuList(); 
        }
    });

    //submit 버튼을 클릭 했을 때 userInput 에 입력된 value 를 출력 
    userSubmitButton.addEventListener('click' ,  addMenuList);
    
    
    //메뉴 이름 수정,삭제 하는 함수 . 이벤트 위임을 통해 수정.삭제 버튼 기능 구현
    espressoMenuList.addEventListener('click' , (event) => {
        //click event가 들어왔을 때 click 의 target 의 class 를 순회 해서 해당 클래스의 버튼이 눌렸으면 
        //해당 함수를 실행
        if(event.target.classList.contains('menu-edit-button')){
            return updateMenuName(event);
        }else if(event.target.classList.contains('menu-remove-button')){
            return removeMenuName(event);
        }else if(event.target.classList.contains('menu-sold-out-button')){
            return soldOutMenuName(event);
        }
    });

    //네비게이션 바에 클릭 이벤트를 주어 카테고리 버튼을 누를때 발생 되는 이벤트 실행
    navigationBar.addEventListener('click' , async (event) => {
        const categoryButton = event.target.classList.contains('cafe-category-name');
        if(categoryButton) {
            const categoryName = event.target.dataset.categoryName;
            const categoryTitle = document.querySelector('#category-title');
            currentCategory = categoryName;
            categoryTitle.innerText = `${event.target.innerText} 메뉴 관리 `;
            //서버에 보내진 데이터를 받아서 메뉴의 요소에 담아서 렌더 해준다
            menu[currentCategory] = await MenuApi.getAllMenuByCategory(currentCategory);
            render();
        }
    })


init();