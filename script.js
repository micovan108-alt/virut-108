  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getDatabase, onChildAdded, get,ref, onChildChanged } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

  const firebaseConfig = {
    apiKey: "AIzaSyDgMMwfv1AgI54owCYHmtYI-Au6brHC4dI",
    authDomain: "server-107.firebaseapp.com",
    databaseURL: "https://server-107-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "server-107",
    storageBucket: "server-107.firebasestorage.app",
    messagingSenderId: "394111941988",
    appId: "1:394111941988:web:c95cb4df3c2954f9bc4e71",
    measurementId: "G-SYX4J1LCF6"
  };

  const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const maytinhref = ref(db, "maytinh");

const langnghe = onChildAdded(maytinhref, (data)=>{
  if(data.val().trangthai === "online"){
    const divpc = document.createElement("div");
    divpc.id = `pc-${data.key}`;
    divpc.style.width = "300px";
    divpc.style.height = "fit-content";
    divpc.style.border = "1px solid #00FF00";
    divpc.style.borderRadius = "5px";
    divpc.style.boxShadow = "0px 0px 5px 2px #33FF33";
    divpc.style.marginLeft = "5px";
    divpc.style.marginTop = "10px";
    divpc.innerHTML= `
    <h3 style="color:#33FFFF;margin-top:5px;margin-left:5px;">${data.key}</h3>
    <p style="color:#33FF33;margin-left:10px;">TRẠNG THÁI: Online</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">💽RAM:${data.val().ram} MB</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🔲CPU:${data.val().cpu}</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🗄️LƯU TRỮ:${data.val().bonho}</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🎮VGA:${data.val().vga}</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🐧Hệ:${data.val().hedieuhanh}</p>
    <a href="termind.html?codepc=${data.key}"><button class="sudung">Sử dụng</button></a>
    `;
    document.body.appendChild(divpc);
  }else{
    const divpc = document.createElement("div");
    divpc.id = `pc-${data.key}`;
    divpc.style.width = "300px";
    divpc.style.height = "fit-content";
    divpc.style.border = "1px solid #ff1500";
    divpc.style.borderRadius = "5px";
    divpc.style.boxShadow = "0px 0px 5px 2px #fc360f";
    divpc.style.marginLeft = "5px";
    divpc.style.marginTop = "10px";
    divpc.innerHTML= `
    <h3 style="color:#33FFFF;margin-top:5px;margin-left:5px;">${data.key}</h3>
    <p style="color:red;margin-left:10px;">TRẠNG THÁI: Offline</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">💽RAM:${data.val().ram} MB</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🔲CPU:${data.val().cpu}</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🗄️LƯU TRỮ:${data.val().bonho}</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🎮VGA:${data.val().vga}</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🐧Hệ:${data.val().hedieuhanh}</p>
    <a href="termind.html?codepc=${data.key}"><button class="sudung" style="background-color:red;color:white;">Xem thử</button></a>
    `;
    document.body.appendChild(divpc);
  }
    
})

onChildChanged(ref(db, `maytinh`), (thaydoi)=>{
  if(thaydoi.val().trangthai === "online"){
    const divpc = document.getElementById(`pc-${thaydoi.key}`);
    divpc.style.width = "300px";
    divpc.style.height = "fit-content";
    divpc.style.border = "1px solid #00FF00";
    divpc.style.borderRadius = "5px";
    divpc.style.boxShadow = "0px 0px 5px 2px #33FF33";
    divpc.style.marginLeft = "5px";
    divpc.style.marginTop = "10px";
    divpc.innerHTML = `
    <h3 style="color:#33FFFF;margin-top:5px;margin-left:5px;">${thaydoi.key}</h3>
    <p style="color:#33FF33;margin-left:10px;">TRẠNG THÁI: Online</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">💽RAM:${thaydoi.val().ram} MB</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🔲CPU:${thaydoi.val().cpu}</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🗄️LƯU TRỮ:${thaydoi.val().bonho}</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🎮VGA:${thaydoi.val().vga}</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🐧Hệ:${thaydoi.val().hedieuhanh}</p>
    <a href="termind.html?codepc=${thaydoi.key}"><button class="sudung">Sử dụng</button></a>
  `
  }else{
    const divpc = document.getElementById(`pc-${thaydoi.key}`);
    divpc.style.width = "300px";
    divpc.style.height = "fit-content";
    divpc.style.border = "1px solid #ff1500";
    divpc.style.borderRadius = "5px";
    divpc.style.boxShadow = "0px 0px 5px 2px #fc360f";
    divpc.style.marginLeft = "5px";
    divpc.style.marginTop = "10px";
    divpc.innerHTML= `
    <h3 style="color:#33FFFF;margin-top:5px;margin-left:5px;">${thaydoi.key}</h3>
    <p style="color:red;margin-left:10px;">TRẠNG THÁI: Offline</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">💽RAM:${thaydoi.val().ram} MB</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🔲CPU:${thaydoi.val().cpu}</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🗄️LƯU TRỮ:${thaydoi.val().bonho}</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🎮VGA:${thaydoi.val().vga}</p>
    <p style="color:#00FFFF;margin-left:10px;font-family:cursive;">🐧Hệ:${thaydoi.val().hedieuhanh}</p>
    <a href="termind.html?codepc=${thaydoi.key}"><button class="sudung" style="background-color:red;color:white;">Xem thử</button></a>
    `;
  }
})


