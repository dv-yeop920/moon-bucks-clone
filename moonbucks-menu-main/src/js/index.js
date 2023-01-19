

const setMenu = (menu) => {
    localStorage.setItem('menu' , JSON.stringify(menu));
}//로컬에 정보를 저장해주는  역할을 해준다 


const app = function() {
    //html에 접근해서 태그들 변수에 할당 해서 쓰기
const menuForm = document.querySelector('#espresso-menu-form');
const userInput = document.querySelector('#espresso-menu-name');
const userSubmitButton = document.querySelector('#espresso-menu-submit-button');
const espressoMenuList = document.querySelector('#espresso-menu-list');


const menuCount = document.querySelector('.menu-count');

    const menu = [];//로컬과 화면에 표시해줄 정보를 담을 배열 선언

    //form 태그가 자동으로 전송 되는 것을 막아 준다
    menuForm.addEventListener('submit', (event) => {
        event.preventDefault();
    })
    
    //수정 또는 삭제 했을 때 메뉴 갯수를 카운터 해주는 함수
    const menuCounter = () => {
        const menuCounted = espressoMenuList.querySelectorAll('li').length;
        menuCount.innerText = `총 ${menuCounted}개`;
    }

    //엔터나 클릭이 됐을 때 실행될 메뉴 리스트 내용을 담은 함수
    const addMenuList = () => {
        const userInputValue = userInput.value;
        menu.push({name: userInputValue});//위에 선언된 빈배열인 menu 에 인풋에 입력한 값을 푸쉬한다
        const template = menu.map((menu) => {
            //menu 배열에 메뉴 하나당 객체 하나로 키값이 담긴다 그 배열의 키의 값을 화면에 출력 하고 로컬에 보내준다
            return `
            <li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${menu.name}</span>
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
        }).join('');//새로운 배열로 생성되는 map 의 배열을 스트링으로 풀어 준다
        //메뉴 추가를 할때 실행할 함수
        /*const menuList = (value) => {
            return `
            <li class="menu-list-item d-flex items-center py-2">
            <span class="w-100 pl-2 menu-name">${value}</span>
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
            </li>`;
        }*/

        //userinput이 '' 이면 경고창을 띄우고 return 으로 실행을 종료 시켜 빈칸의 리스트가 작성이 안되게 한다
        if(userInputValue === ''){
            return alert('메뉴 이름을 작성해 주세요!');
        }
        espressoMenuList.innerHTML = template;//ul에 맵으로 맵핑해서 등록해준다 //insertAdjacentHTML('beforeend',menuList(userInputValue));
        setMenu(menu);//로컬로 menu 배열을 보내준다
        //리스트를 작성할 때 마다 espressoMenuList에 있는 <li> 노드의 갯수 즉 , length 를 불러와 변수에 할당 후 갯수를 카운트 해준다.
        menuCounter();
        userInput.value = '';

    }

    const updateMenuName = (event) => {
        const menuName = event.target.closest('li').querySelector('.menu-name');
    
        if(event.target.classList.contains('menu-edit-button')){
            const modifiedName = prompt('메뉴 수정' , menuName.innerText);
            
            if(modifiedName){
                return menuName.innerText = modifiedName;
            }else{
                menuName.innerText = menuName.innerText;
            }
        }
    }

    const removeMenuName = (event) => {
        const menuTag = event.target.closest('li');

        if(confirm('정말 삭제 하시겠습니까?')){
            menuTag.remove();
            menuCounter();
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
    })
}

app();






