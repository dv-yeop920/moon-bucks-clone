
/*
step 1 => Todo localstorage Read & Write
    [*] localStorage에 데이터를 저장한다
    [*] 추가 , 수정 , 삭제 버튼을 클릭 하면 localStorage에 상태값이 저장 된다
    [] localStrage에 있는 데이터를 읽어 온다
step 2 => 카테고리별 메뉴판 관리
    [] 에스프레소, 프라푸치노, 블렌디드, 티바나, 디저트 각각의 종류별로 메뉴판을 관리할 수 있게 만든다.
step 3 => 페이지 최초 접근시 최초 데이터 Read & Rendering
    [] 페이지에 최초로 접근할 때는 에스프레소 메뉴가 먼저 읽어 온다
    [] 에스프레소 메뉴를 페이지에 표시 해준다
step 4 => 품절 상태 관리 
    [] 품절 상태인 경우를 보여줄 수 있게, 품절 버튼을 추가하고 sold-out class를 추가하여 상태를 변경한다.
    [] 품절 버튼을 추가 한다
    [] 품절 ,수정 , 삭제 버튼을 클릭 하면 localStorage에 상태값이 저장 된다
    [] 클릭 이벤트에서 가장 가까운 li 태그의 class 속성 값에 sold-out을 추가 한다
품절 상태 메뉴의 마크업  */

const setMenu = (menu) => {
    localStorage.setItem('menu' , JSON.stringify(menu));
}//로컬에 정보를 저장해주는  역할을 해준다 


const getMenu = () => {
    return JSON.parse(localStorage.getItem('menu'));
}


function init(){
    if(getMenu().length >= 1){
        menu = getMenu();
    }
    render();
}

    //html에 접근해서 태그들 변수에 할당 해서 쓰기
const menuForm = document.querySelector('#espresso-menu-form');
const userInput = document.querySelector('#espresso-menu-name');
const userSubmitButton = document.querySelector('#espresso-menu-submit-button');
const espressoMenuList = document.querySelector('#espresso-menu-list');

const menuCount = document.querySelector('.menu-count');

//console.log(getMenu());
let menu = [];
    //로컬과 화면에 표시해줄 정보를 담을 배열 선언(배열로 초기화 시켜주는 이유는 우리가 invalue를 어떤 데이터 형식으로 받아올지 모르기 때문에
                    // 어떤 데이터 형식이든 배열에 push를 해줘서 다른 사람과 작업을 할 때 상태를 배열로 관리를 하는 구나 라는 의도를 알려주기 위해 

    //form 태그가 자동으로 전송 되는 것을 막아 준다
    menuForm.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    
    //수정 또는 삭제 했을 때 메뉴 갯수를 카운터 해주는 함수
    const menuCounter = () => {
        const menuCounted = espressoMenuList.querySelectorAll('li').length;
        menuCount.innerText = `총 ${menuCounted}개`;
    }

    const render = () => {
        const template = menu.map((menu , index) => {
        //menu 배열에 메뉴 하나당 객체 하나로 키값이 담긴다 그 배열의 키의 값을 화면에 출력 하고 로컬에 보내준다
        //data 라는건 html 마크업에 어떤 데이터를 저장하고 싶을때 쓰는 표준 속성 , 그 뒤는 개발자에 의도에 의해 필요한 것에 따라 명칭을 정할 수 있다.
        //지금은 id 값을 식별 하기 위해 menu-id 라고 이름을 설정 하고 배열의 index 값으로 아이디를 체크 한다
        return `
        <li data-menu-id ="${index}" class="menu-list-item d-flex items-center py-2">
        <span class="w-100 pl-2 menu-name">${menu}</span>
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
};//새로운 배열로 생성되는 map 의 배열을 스트링으로 풀어 준다

    //엔터나 클릭이 됐을 때 실행될 메뉴 리스트 내용을 담은 함수
    const addMenuList = () => {
        const userInputValue = userInput.value;
        if(userInput.value === ''){
            return alert('메뉴 이름을 작성해 주세요!');
        }
        //위에 선언된 빈배열인 menu 에 인풋에 입력한 값을 푸쉬한다
        menu.push(userInputValue);
        render();
        setMenu(menu);//로컬로 menu 배열을 보내준다
        //리스트를 작성할 때 마다 espressoMenuList에 있는 <li> 노드의 갯수 즉 , length 를 불러와 변수에 할당 후 갯수를 카운트 해준다.
        menuCounter();
        userInput.value = '';

    }
    
    const updateMenuName = (event) => {
        //위에 설정해 놓은 data 값을 dataset 이라는 속성으로 활용할 수 있다 . 뒤에는 설정해 놓은 이름 menu-id 를 함수명 작성 하듯이 적어 준다
        const menuId = event.target.closest('li').dataset.menuId;
        const menuName = event.target.closest('li').querySelector('.menu-name');

        if(event.target.classList.contains('menu-edit-button')){
            const modifiedName = prompt('메뉴 수정' , menuName.innerText);

            if(modifiedName){
                menuName.innerText = modifiedName;
                //menuId 는 배열의 index 값과 동일하기 때문에 menu의 인덱스에 접근해 해당 name 키에 있는 값을 수정한 값으로 로컬에서 바꿔 준다.
                menu[menuId].name = modifiedName;
                //바꿔준 값을 local 에 보내주면 바뀐다 
                //데이터를 바꿔 줄때는 항상 최소한의 꼬이지 않게 깔끔하게 로직을 짠다 한번에 모든 함수에서 해결 하려 하지 말고 역할을 나눠 준다
                setMenu(menu);
            }else{
                menuName.innerText = menuName.innerText;
            }
        }
    }

    const removeMenuName = (event) => {
        const menuId = event.target.closest('li').dataset.menuId;

        if(confirm('정말 삭제 하시겠습니까?')){
            menu.splice(menuId, 1);
            setMenu(menu);
            render();
            console.log(menuId)
            menuCounter();
            //menu 배열에 접근해 splice 로 삭제 버튼을 누른 해당 index 에 요소 를 지운다 그 후 setMenu로 로컬에 전달 한다
        }
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
            updateMenuName(event);
        }else if(event.target.classList.contains('menu-remove-button')){
            removeMenuName(event);
        }
    });




init();