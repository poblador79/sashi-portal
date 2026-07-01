import { useState, useEffect } from 'react';

const C = {
  gold:'#C9A96E',bg:'#0d0d0d',surface:'#141414',border:'#2a2520',
  muted:'#8a8070',text:'#f0ede8',dim:'#4a4040',green:'#6aaa80',
  greenBg:'#0a1a10',greenBorder:'#1a3a20',
};

const CLIENTS = {
  'sb-mf8k2':{name:'Marco Ferretti',company:'Macelleria Ferretti',city:'Milano',phone:'+393471234567',etapa:'Caliente',lastOrder:{date:'23 giu 2025',items:[{name:'Sagyu Loin',kg:5,price:38.50},{name:'Prussian Black Striploin',kg:10,price:28.00}],total:472.50}},
  'sb-lb3p9':{name:'Lucia Bianchi',company:'Bisteccheria Bianchi',city:'Torino',phone:'+393381234567',etapa:'Tibio',lastOrder:{date:'18 giu 2025',items:[{name:'Mountain Beef Ribeye',kg:8,price:22.00},{name:'Wayne & Willis Costata',kg:12,price:19.50}],total:410.00}},
  'sb-gr7x1':{name:'Giovanni Rossi',company:'Macelleria Rossi Premium',city:'Roma',phone:'+393331234567',etapa:'Caliente',lastOrder:{date:'20 giu 2025',items:[{name:'Sagyu Loin',kg:3,price:38.50},{name:'Freygaard Tenderloin',kg:6,price:32.00}],total:307.50}},
  'sb-demo':{name:'Demo Cliente',company:'Macelleria Demo',city:'Firenze',phone:'+393001234567',etapa:'Tibio',lastOrder:{date:'15 giu 2025',items:[{name:'Choco Beef Sirloin',kg:4,price:26.50},{name:'Mountain Beef Ribeye',kg:6,price:22.00}],total:238.00}},
};

const PRODUCTS = [
  {id:1,name:'Sagyu Loin',price:38.50,marbling:'BMS 8–10',origin:'Finlandia',badge:'Esclusivo Italia',badgeColor:'#1a1200',desc:'Il meglio del wagyu nordico. Texture burrosa, sapore intenso.'},
  {id:2,name:'Prussian Black Striploin',price:28.00,marbling:'BMS 5–7',origin:'Germania',badge:'Premium',badgeColor:'#0a0a1a',desc:'Equilibrio perfetto tra marezzatura e carattere.'},
  {id:3,name:'Wayne & Willis Costata',price:19.50,marbling:'Standard',origin:'Europa',badge:'Volume',badgeColor:'#0a1a0a',desc:'Qualità affidabile per grandi volumi.'},
  {id:4,name:'Freygaard Tenderloin',price:32.00,marbling:'BMS 6–8',origin:'Finlandia',badge:'Limitato',badgeColor:'#1a0e00',desc:'Filetto nordico di rara delicatezza. Quantità limitate.'},
  {id:5,name:'Choco Beef Sirloin',price:26.50,marbling:'BMS 5–6',origin:'Finlandia',badge:'Limitato',badgeColor:'#1a0800',desc:'Allevato con dieta di cacao. Profilo aromatico unico.'},
  {id:6,name:'Mountain Beef Ribeye',price:22.00,marbling:'Choice',origin:'Germania / Austria',badge:'Disponibile',badgeColor:'#001a10',desc:'Ribeye di montagna. Sapore robusto e marezzatura uniforme.'},
];

const ORDER_HISTORY = [
  {id:'ORD-2025-041',date:'10 giu 2025',items:3,total:318.00,status:'Consegnato'},
  {id:'ORD-2025-029',date:'25 mag 2025',items:2,total:212.50,status:'Consegnato'},
  {id:'ORD-2025-018',date:'12 mag 2025',items:4,total:489.00,status:'Consegnato'},
];

const T = {
  IT:{last:'Ultimo ordine',reorder:'Riordina',catalog:'Catalogo settimanale',add:'Aggiungi',summary:'Riepilogo ordine',empty:'Nessun articolo aggiunto',confirm:'Conferma ordine',history:'Storico ordini',contact:'Contatta David',total:'Totale',sent:'✓ Ordine inviato a David via WhatsApp',pdf:'Scarica catalogo PDF',items:'articoli',origin:'Origine',marbling:'Marezzatura',note:'Il tuo ordine verrà inviato direttamente a David via WhatsApp. Conferma entro 2 ore lavorative.'},
  EN:{last:'Last order',reorder:'Reorder',catalog:'Weekly catalogue',add:'Add',summary:'Order summary',empty:'No items added yet',confirm:'Confirm order',history:'Order history',contact:'Contact David',total:'Total',sent:'✓ Order sent to David via WhatsApp',pdf:'Download PDF catalogue',items:'items',origin:'Origin',marbling:'Marbling',note:'Your order will be sent to David via WhatsApp. Confirmation within 2 business hours.'},
};

function getToken(){try{return new URLSearchParams(window.location.search).get('client');}catch{return null;}}

function GoldBadge({label,bg}){return(<span style={{fontSize:'10px',letterSpacing:'0.08em',textTransform:'uppercase',color:C.gold,background:bg||'#1a1400',border:`1px solid ${C.gold}33`,padding:'3px 8px',borderRadius:'2px'}}>{label}</span>);}

function LangSwitcher({lang,setLang}){return(<div style={{display:'flex',gap:'8px'}}>{['IT','EN'].map(l=>(<button key={l} onClick={()=>setLang(l)} style={{background:'none',border:`1px solid ${l===lang?C.gold:'transparent'}`,color:l===lang?C.gold:C.muted,padding:'3px 10px',borderRadius:'2px',cursor:'pointer',fontSize:'11px',letterSpacing:'0.1em',fontFamily:'Georgia, serif'}}>{l}</button>))}</div>);}

function AdminPanel({onEnter}){
  const [copied,setCopied]=useState(null);
  const base=window.location.href.split('?')[0];
  const copy=(token)=>{navigator.clipboard.writeText(`${base}?client=${token}`).then(()=>{setCopied(token);setTimeout(()=>setCopied(null),2000);});};
  return(
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{width:'100%',maxWidth:'660px'}}>
        <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
          <div style={{fontSize:'11px',letterSpacing:'0.25em',textTransform:'uppercase',color:C.gold,marginBottom:'10px'}}>JN Meat International</div>
          <div style={{fontSize:'32px',letterSpacing:'0.04em',color:C.text,fontWeight:'normal'}}>Sashi Beef</div>
          <div style={{width:'32px',height:'1px',background:C.gold,margin:'16px auto'}}/>
          <div style={{fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:C.muted}}>Generatore link clienti</div>
        </div>
        <div style={{border:`1px solid ${C.border}`,background:C.surface}}>
          <div style={{padding:'1rem 1.5rem',borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:C.gold}}>Link personalizzati</div>
          </div>
          {Object.entries(CLIENTS).map(([token,c],i,arr)=>(
            <div key={token} style={{padding:'1rem 1.5rem',borderBottom:i<arr.length-1?`1px solid ${C.border}`:'none',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
              <div style={{flex:1}}>
                <div style={{fontSize:'14px',color:C.text,marginBottom:'3px'}}>{c.name}</div>
                <div style={{fontSize:'11px',color:C.muted}}>{c.company} · {c.city}</div>
                <div style={{fontSize:'10px',color:C.dim,marginTop:'4px',fontFamily:'monospace'}}>?client={token}</div>
              </div>
              <div style={{display:'flex',gap:'8px',flexShrink:0}}>
                <button onClick={()=>copy(token)} style={{background:copied===token?C.greenBg:'none',border:`1px solid ${copied===token?C.greenBorder:C.border}`,color:copied===token?C.green:C.muted,padding:'6px 14px',borderRadius:'2px',cursor:'pointer',fontSize:'11px',letterSpacing:'0.06em',textTransform:'uppercase',fontFamily:'Georgia, serif',whiteSpace:'nowrap'}}>{copied===token?'✓ Copiato':'Copia link'}</button>
                <button onClick={()=>onEnter(token)} style={{background:'none',border:`1px solid ${C.gold}44`,color:C.gold,padding:'6px 14px',borderRadius:'2px',cursor:'pointer',fontSize:'11px',letterSpacing:'0.06em',textTransform:'uppercase',fontFamily:'Georgia, serif',whiteSpace:'nowrap'}}>Apri →</button>
              </div>
            </div>
          ))}
        </div>
        <div style={{marginTop:'1.25rem',padding:'1rem 1.25rem',background:'#0e0c08',border:'1px solid #2a2010'}}>
          <div style={{fontSize:'10px',letterSpacing:'0.12em',textTransform:'uppercase',color:'#6a5a30',marginBottom:'8px'}}>Messaggio WhatsApp — Make</div>
          <div style={{fontSize:'12px',color:'#6a5a30',lineHeight:1.9,fontFamily:'monospace'}}>
            Ciao {'{{'}name{'}}'}, il tuo portale Sashi Beef:<br/>{base}?client={'{{'}token{'}}'}
          </div>
        </div>
      </div>
    </div>
  );
}

function Portal({client}){
  const [cart,setCart]=useState([]);
  const [quantities,setQuantities]=useState({});
  const [confirmed,setConfirmed]=useState(false);
  const [lang,setLang]=useState('IT');
  const t=T[lang];
  const setQty=(id,val)=>setQuantities(q=>({...q,[id]:Math.max(0,parseFloat(val)||0)}));
  const addToCart=(p)=>{const qty=quantities[p.id]||1;if(qty<=0)return;setCart(c=>{const ex=c.find(i=>i.id===p.id);return ex?c.map(i=>i.id===p.id?{...i,qty:i.qty+qty}:i):[...c,{...p,qty}];});setQuantities(q=>({...q,[p.id]:0}));};
  const removeFromCart=id=>setCart(c=>c.filter(i=>i.id!==id));
  const cartTotal=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const doReorder=()=>{const items=client.lastOrder.items.map(i=>{const p=PRODUCTS.find(p=>p.name===i.name);return p?{...p,qty:i.kg}:null;}).filter(Boolean);setCart(items);};
  const handleConfirm=()=>{if(cart.length===0||confirmed)return;setConfirmed(true);setCart([]);};
  const waLink=`https://wa.me/34600000000?text=${encodeURIComponent(`Ciao David, sono ${client.name} di ${client.company}.`)}`;

  return(
    <div>
      <div style={{background:'#0a0a0a',borderBottom:`1px solid ${C.border}`,position:'sticky',top:0,zIndex:100}}>
        <div style={{maxWidth:'960px',margin:'0 auto',padding:'0 1.5rem',height:'52px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <span style={{fontSize:'15px',letterSpacing:'0.06em',color:C.gold}}>Sashi Beef</span>
            <span style={{color:C.border}}>|</span>
            <span style={{fontSize:'12px',color:C.muted}}>{client.company}</span>
          </div>
          <LangSwitcher lang={lang} setLang={setLang}/>
        </div>
      </div>
      <div style={{maxWidth:'960px',margin:'0 auto',padding:'2rem 1.5rem'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:C.border,marginBottom:'2rem',border:`1px solid ${C.border}`}}>
          <div style={{background:C.surface,padding:'1.75rem'}}>
            <div style={{fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Benvenuto</div>
            <div style={{fontSize:'22px',color:C.text,marginBottom:'4px'}}>{client.name}</div>
            <div style={{fontSize:'13px',color:C.muted}}>{client.city}</div>
            <div style={{marginTop:'14px'}}><GoldBadge label={client.etapa}/></div>
          </div>
          <div style={{background:C.surface,padding:'1.75rem'}}>
            <div style={{fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:C.muted,marginBottom:'12px'}}>{t.last} — {client.lastOrder.date}</div>
            {client.lastOrder.items.map((item,i)=>(<div key={i} style={{display:'flex',justifyContent:'space-between',fontSize:'13px',color:C.text,marginBottom:'6px'}}><span>{item.name}</span><span style={{color:C.muted}}>{item.kg} kg — €{(item.price*item.kg).toFixed(2)}</span></div>))}
            <div style={{marginTop:'12px',paddingTop:'12px',borderTop:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <span style={{color:C.gold,fontSize:'16px'}}>€{client.lastOrder.total.toFixed(2)}</span>
              <button onClick={doReorder} style={{background:'none',border:`1px solid ${C.gold}`,color:C.gold,padding:'6px 16px',borderRadius:'2px',cursor:'pointer',fontSize:'12px',letterSpacing:'0.08em',textTransform:'uppercase',fontFamily:'Georgia, serif'}}>{t.reorder}</button>
            </div>
          </div>
        </div>
        <div style={{marginBottom:'2rem'}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:'1.25rem'}}>
            <div style={{fontSize:'11px',letterSpacing:'0.2em',textTransform:'uppercase',color:C.gold}}>{t.catalog}</div>
            <a href="https://res.cloudinary.com/dpi1hvgnt/image/upload/JN_Meat_La_Collezione_IT_v2_epqely.pdf" target="_blank" rel="noreferrer" style={{color:C.muted,fontSize:'12px',textDecoration:'none'}}>{t.pdf} ↗</a>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'1px',background:C.border}}>
            {PRODUCTS.map(p=>(
              <div key={p.id} style={{background:C.surface,padding:'1.5rem',display:'flex',flexDirection:'column'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:'10px'}}>
                  <div style={{fontSize:'15px',color:C.text,lineHeight:1.3,flex:1,paddingRight:'8px'}}>{p.name}</div>
                  <GoldBadge label={p.badge} bg={p.badgeColor}/>
                </div>
                <div style={{fontSize:'12px',color:C.muted,marginBottom:'12px',lineHeight:1.5}}>{p.desc}</div>
                <div style={{display:'flex',gap:'16px',marginBottom:'14px'}}>
                  <div><div style={{fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#4a4030',marginBottom:'3px'}}>{t.origin}</div><div style={{fontSize:'12px',color:C.muted}}>{p.origin}</div></div>
                  <div><div style={{fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#4a4030',marginBottom:'3px'}}>{t.marbling}</div><div style={{fontSize:'12px',color:C.muted}}>{p.marbling}</div></div>
                  <div style={{marginLeft:'auto'}}><div style={{fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#4a4030',marginBottom:'3px'}}>€/kg</div><div style={{fontSize:'18px',color:C.gold}}>€{p.price.toFixed(2)}</div></div>
                </div>
                <div style={{display:'flex',gap:'8px',marginTop:'auto'}}>
                  <input type="number" min="0" step="0.5" value={quantities[p.id]||''} onChange={e=>setQty(p.id,e.target.value)} placeholder="kg" style={{width:'70px',background:C.bg,border:`1px solid ${C.border}`,color:C.text,padding:'8px 10px',fontSize:'14px',borderRadius:'2px',fontFamily:'Georgia, serif',outline:'none'}}/>
                  <button onClick={()=>addToCart(p)} style={{flex:1,background:'none',border:`1px solid ${C.border}`,color:C.muted,padding:'8px',borderRadius:'2px',cursor:'pointer',fontSize:'12px',letterSpacing:'0.06em',textTransform:'uppercase',fontFamily:'Georgia, serif'}} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.color=C.gold;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.color=C.muted;}}>{t.add}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:C.border,marginBottom:'2rem',border:`1px solid ${C.border}`}}>
          <div style={{background:C.surface,padding:'1.75rem'}}>
            <div style={{fontSize:'11px',letterSpacing:'0.2em',textTransform:'uppercase',color:C.gold,marginBottom:'1rem'}}>{t.summary}</div>
            {cart.length===0?<div style={{color:C.dim,fontSize:'13px',fontStyle:'italic'}}>{t.empty}</div>:<>
              {cart.map(item=>(<div key={item.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'10px',paddingBottom:'10px',borderBottom:`1px solid ${C.border}`}}><div><div style={{fontSize:'13px',color:C.text}}>{item.name}</div><div style={{fontSize:'11px',color:C.muted}}>{item.qty} kg × €{item.price.toFixed(2)}</div></div><div style={{display:'flex',alignItems:'center',gap:'12px'}}><span style={{color:C.gold,fontSize:'14px'}}>€{(item.qty*item.price).toFixed(2)}</span><button onClick={()=>removeFromCart(item.id)} style={{background:'none',border:'none',color:C.dim,cursor:'pointer',fontSize:'18px',lineHeight:1}}>×</button></div></div>))}
              <div style={{display:'flex',justifyContent:'space-between',paddingTop:'8px'}}><span style={{fontSize:'13px',letterSpacing:'0.06em',textTransform:'uppercase',color:C.muted}}>{t.total}</span><span style={{fontSize:'20px',color:C.gold}}>€{cartTotal.toFixed(2)}</span></div>
            </>}
          </div>
          <div style={{background:C.surface,padding:'1.75rem',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
            <div style={{fontSize:'13px',color:confirmed?C.green:C.muted,lineHeight:1.8}}>{confirmed?t.sent:t.note}</div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px',marginTop:'1.5rem'}}>
              <button onClick={handleConfirm} disabled={cart.length===0||confirmed} style={{background:cart.length>0&&!confirmed?C.gold:'#2a2520',color:cart.length>0&&!confirmed?C.bg:C.dim,border:'none',padding:'14px',borderRadius:'2px',cursor:cart.length>0&&!confirmed?'pointer':'default',fontSize:'12px',letterSpacing:'0.12em',textTransform:'uppercase',fontFamily:'Georgia, serif',fontWeight:'bold'}}>{t.confirm}</button>
              <a href={waLink} target="_blank" rel="noreferrer" style={{display:'block',textAlign:'center',background:'none',border:`1px solid ${C.border}`,color:C.muted,padding:'12px',borderRadius:'2px',fontSize:'12px',letterSpacing:'0.08em',textTransform:'uppercase',textDecoration:'none',fontFamily:'Georgia, serif'}}>💬 {t.contact}</a>
            </div>
          </div>
        </div>
        <div style={{border:`1px solid ${C.border}`,background:C.surface}}>
          <div style={{padding:'1rem 1.75rem',borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontSize:'11px',letterSpacing:'0.2em',textTransform:'uppercase',color:C.gold}}>{t.history}</div>
          </div>
          {ORDER_HISTORY.map((o,i)=>(<div key={o.id} style={{padding:'1rem 1.75rem',borderBottom:i<ORDER_HISTORY.length-1?`1px solid ${C.border}`:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}><div><div style={{fontSize:'13px',color:C.text,marginBottom:'3px'}}>{o.id}</div><div style={{fontSize:'11px',color:C.muted}}>{o.date} — {o.items} {t.items}</div></div><div style={{display:'flex',alignItems:'center',gap:'20px'}}><span style={{fontSize:'14px',color:C.gold}}>€{o.total.toFixed(2)}</span><span style={{fontSize:'10px',letterSpacing:'0.1em',textTransform:'uppercase',color:'#4a7060',background:C.greenBg,border:`1px solid ${C.greenBorder}`,padding:'3px 8px',borderRadius:'2px'}}>{o.status}</span></div></div>))}
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const [view,setView]=useState(null);
  useEffect(()=>{const token=getToken();setView(token&&CLIENTS[token]?token:'admin');},[]);
  if(!view)return null;
  if(view==='admin')return <AdminPanel onEnter={setView}/>;
  return <Portal client={CLIENTS[view]}/>;
}
