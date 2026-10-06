  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";
  import { getDatabase, onChildAdded, get,ref, push, onChildChanged, remove } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

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

const laythamso = new URLSearchParams(window.location.search);
const tenpc = laythamso.get("codepc");
document.getElementById("tenpcheader").innerText = "🖥️" + tenpc;
document.getElementById("onhap").addEventListener("keydown", async (e)=>{

    if(e.key === "Enter"){
      const lenh = document.getElementById("onhap").value;
        await push(ref(db, `maytinh/${tenpc}/code`),{
          lenh:lenh,
          dathucthi:"false",
          time: Date.now(),
        })
        document.getElementById("onhap").value = "";
    }
})
async function laymau(){
  const nguon = await get(ref(db, `maytinh/${tenpc}/trangthai`));
  if(nguon.val() === "online"){
    document.getElementById("tatpcbtn").style.backgroundColor = "rgb(1, 213, 1)";
  }else{
    document.getElementById("tatpcbtn").style.backgroundColor = "red";
  }
}
laymau();

const lenhref = ref(db, `maytinh/${tenpc}/code`);
const laylenh = onChildAdded(lenhref, (data)=>{
  const khungtin = document.createElement("div");
  khungtin.style.width = "fit-content";
  khungtin.style.maxWidth = "700px";
  khungtin.style.height = "fit-content";
  khungtin.style.border = "1px solid yellow";
  khungtin.className = "divtin";
  khungtin.innerHTML = `
  <p style="color:red;font-size:17px;margin-left:10px;margin-top:8px;margin-bottom:8px;margin-right:10px;">C:\\Users\\${tenpc} ></p>
  <p style="color:#33FF66;font-size:15px;margin-left:10px;margin-top:8px;margin-bottom:8px;margin-right:10px;"> ${data.val().lenh}</p>
  `
  document.getElementById("hienthi").appendChild(khungtin);

    
    const ketqua = document.createElement("div");
    ketqua.style.width = "fit-content";
    
    ketqua.style.height = "fit-content";
    ketqua.style.border = "1px solid yellow";
    ketqua.className = "divtin";
    if(data.val().dathucthi === "true"){
    ketqua.innerHTML = `
    <p style="color:red;font-size:17px;margin-left:10px;margin-top:8px;margin-bottom:8px;margin-right:10px;">C:\\Users\\${tenpc} ></p>
    <pre style="color:#33FF66;font-size:13px;margin-left:10px;margin-top:8px;margin-bottom:8px;margin-right:10px;">${data.val().ketqua}</pre>
    `
    document.getElementById("hienthi").appendChild(ketqua);
    }else{
      ketqua.innerHTML = `
    <p style="color:red;font-size:17px;margin-left:10px;margin-top:8px;margin-bottom:8px;margin-right:10px;">C:\\Users\\${tenpc} ></p>
    <pre id="ketquacho${data.key}" style="color:#33FF66;font-size:13px;margin-left:10px;margin-top:8px;margin-bottom:8px;margin-right:10px;">Đang chờ kết quả...</pre>
    `
    document.getElementById("hienthi").appendChild(ketqua);
    }

  
  document.getElementById("hienthi").scrollTop = 9999;
  document.getElementById("hienthi").scrollRight = 9999;

  //đổi màu nút nguồn

  if(data.val().trangthai === "online"){
    document.getElementById("tatpcbtn").style.backgroundColor = "rgb(1, 213, 1)";
  }else{
    document.getElementById("tatpcbtn").style.backgroundColor = "red";
  }
  
})

const langnghethaydoi = onChildChanged(lenhref, (a)=>{
    document.getElementById(`ketquacho${a.key}`).innerText = a.val().ketqua;
    document.getElementById("hienthi").scrollTop = 9999;
    document.getElementById("hienthi").scrollRight = 9999;
  })

document.getElementById("lammoi").addEventListener("click", async ()=>{
  await remove(ref(db, `maytinh/${tenpc}/code`));
  document.getElementById("hienthi").innerHTML = "";
})