import { useState, useEffect } from 'react';

const C = { gold:'#C9A96E', bg:'#0d0d0d', surface:'#141414', border:'#2a2520', muted:'#8a8070', text:'#f0ede8', dim:'#4a4040', green:'#6aaa80', greenBg:'#0a1a10', greenBorder:'#1a3a20' };

const CDN = 'https://res.cloudinary.com/dpi1hvgnt/image/upload';
const LOGOS = {
  'SASHI':           `${CDN}/v1783000064/IMG_5906-removebg-preview_epbdhy.png`,
  'SAGYU':           `${CDN}/v1783000065/IMG_5908_p77ubu.jpg`,
  'PRUSSIAN BLACK':  `${CDN}/v1783000064/IMG_5905-removebg-preview_nwxesf.png`,
  'FREYGAARD':       `${CDN}/v1783000065/IMG_5910-removebg-preview_ms5nrk.png`,
  'FREYGAARD CHOCO': `${CDN}/v1783000064/IMG_5909-removebg-preview_uohpv0.png`,
  'WAYNE & WILLIS':  `${CDN}/v1783000065/WW_foto-removebg-preview_oubqo8.png`,
  'MOUNTAIN BEEF':   `${CDN}/v1783000065/IMG_5907_svbfff.jpg`,
};

function BrandLogo({ brand, size=52 }) {
  return (
    <div style={{ width:size, height:size, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
      <img src={LOGOS[brand]} alt={brand} style={{ maxWidth:size, maxHeight:size, objectFit:'contain', display:'block' }} />
    </div>
  );
}

function BrandCard({ brand, active, onClick }) {
  return (
    <button onClick={onClick}
      style={{ background: active ? '#1a1500' : '#111', border: `1px solid ${active ? C.gold : '#2a2520'}`, borderRadius:'8px', cursor:'pointer', padding:'1.5rem 1rem', display:'flex', flexDirection:'column', alignItems:'center', gap:'12px', width:'100%', transition:'transform 0.15s', transform: active ? 'translateY(-2px)' : 'none', boxShadow: active ? `0 0 0 2px ${C.gold}` : 'none' }}>
      <div style={{ width:90, height:90, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <img src={LOGOS[brand.name]} alt={brand.name} style={{ maxWidth:90, maxHeight:90, objectFit:'contain' }} />
      </div>
      <div style={{ fontSize:'10px', color: active ? C.gold : C.muted, textAlign:'center', letterSpacing:'0.08em', textTransform:'uppercase', lineHeight:1.4 }}>{brand.name}</div>
      <div style={{ fontSize:'9px', color:'#5a4a30', textAlign:'center', lineHeight:1.4 }}>{brand.desc}</div>
    </button>
  );
}

const BRANDS = [
  { id:'sashi', name:'SASHI', desc:'Triple Gold Winner · WSC', cuts:[
    {name:'Costata / Rib Eye Cube Roll Diamond — Vacca', price:40.00, unit:'cartone'},
    {name:'Lombo / Striploin Diamond — Vacca', price:19.95, unit:'cartone'},
    {name:'T-Bone Diamond — Vacca 6–8 kg', price:18.50, unit:'cartone'},
    {name:'T-Bone Diamond — Scottona 5–6 kg', price:18.50, unit:'cartone'},
    {name:'8 Costole Bone-In Diamond — Vacca', price:20.00, unit:'cartone'},
    {name:'Filetto / Solomillo 3 kg+', price:26.50, unit:'cartone'},
    {name:'Picanha Diamond — Vacca', price:18.50, unit:'cartone'},
    {name:'Cuore di Scamone Diamond — Vacca', price:12.25, unit:'cartone'},
    {name:'Pistola Scottona Finland 90+ Diamond', price:11.50, unit:'unità', unitLabel:'pistola (~65 kg)'},
    {name:'Pistola Vacca Finland 90+ Diamond', price:10.95, unit:'unità', unitLabel:'pistola (~90 kg)'},
    {name:'Fesa / Topside Scottona', price:11.25, unit:'cartone'},
    {name:'Sottofesa Vacca', price:9.15, unit:'cartone'},
    {name:'Spinacino / Tri-tip Diamond', price:12.00, unit:'cartone'},
  ]},
  { id:'sagyu', name:'SAGYU', desc:'Artisan Collection · Esclusivo IT', cuts:[
    {name:'Lomo 16+ Diamond — Scottona', price:19.75, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 18+ Diamond — Scottona', price:20.00, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 22+ Diamond — Scottona', price:21.00, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 22+ AAA — Scottona', price:29.75, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 22+ Gold — Scottona', price:16.75, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
  ]},
  { id:'prussian', name:'PRUSSIAN BLACK', desc:'Eat Less Choose Better · Halal', cuts:[
    {name:'Lomo 23+ Standard', price:13.75, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 23+ Gold', price:14.75, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 23+ Diamond', price:18.25, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 23+ AAA', price:22.25, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 25+ Gold', price:16.50, unit:'unità', unitLabel:'lomo (~25–27 kg)'},
    {name:'Lomo 25+ Diamond', price:19.75, unit:'unità', unitLabel:'lomo (~25–27 kg)'},
    {name:'Lomo 27+ Diamond', price:20.25, unit:'unità', unitLabel:'lomo (~27–30 kg)'},
    {name:'Lomo 30+ Diamond', price:20.50, unit:'unità', unitLabel:'lomo (~30+ kg)'},
    {name:'Lomo 30+ AAA', price:25.25, unit:'unità', unitLabel:'lomo (~30+ kg)'},
    {name:'Pistola Vacca 90+ Diamond', price:10.95, unit:'unità', unitLabel:'pistola (~90 kg)'},
  ]},
  { id:'freygaard', name:'FREYGAARD', desc:'Nordic Nature Finland · Danish Red', cuts:[
    {name:'Lomo 23+ Standard — Vacca Nordic', price:15.25, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 23+ Gold — Vacca Nordic', price:16.25, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 23+ Diamond — Vacca Nordic', price:19.75, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 25+ Diamond — Vacca Nordic', price:21.25, unit:'unità', unitLabel:'lomo (~25–27 kg)'},
    {name:'Lomo 30+ AAA — Vacca Nordic', price:26.75, unit:'unità', unitLabel:'lomo (~30+ kg)'},
    {name:'Lomo 16+ Diamond — Scottona Finland', price:19.75, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 18+ Diamond — Scottona Finland', price:20.75, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 22+ Diamond — Scottona Finland', price:21.00, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Pistola Scottona Finland Standard', price:11.50, unit:'unità', unitLabel:'pistola (~65 kg)'},
    {name:'Pistola Vacca Nordic 90+ Diamond', price:11.75, unit:'unità', unitLabel:'pistola (~90 kg)'},
    {name:'8 Costole 14+ Gold — Vacca Nordic', price:18.00, unit:'cartone'},
    {name:'8 Costole 14+ Diamond — Vacca Nordic', price:20.00, unit:'cartone'},
  ]},
  { id:'choco', name:'FREYGAARD CHOCO', desc:'Scottona con dieta di cacao · Finland', cuts:[
    {name:'Lombata Diamond', price:22.00, unit:'cartone'},
    {name:'Lombata Gold', price:19.75, unit:'cartone'},
    {name:'T-Bone con Filetto Diamond', price:21.00, unit:'cartone'},
    {name:'Loin Set Completo (Filetto+Ribeye+Striploin)', price:51.00, unit:'set', unitLabel:'set completo'},
    {name:'8 Costole Bone-In Gold', price:20.00, unit:'cartone'},
    {name:'Cuore di Scamone', price:19.75, unit:'cartone'},
    {name:'Fesa / Topside', price:13.25, unit:'cartone'},
    {name:'Pistola Scottona Choco Standard', price:12.50, unit:'unità', unitLabel:'pistola (~65 kg)'},
    {name:'Tri-tip / Maminha', price:13.75, unit:'cartone'},
  ]},
  { id:'wayne', name:'WAYNE & WILLIS', desc:'100% Original · Linea Premium', cuts:[
    {name:'Controfiletto 5 kg+', price:15.00, unit:'cartone'},
    {name:'Controfiletto 6 kg+', price:15.75, unit:'cartone'},
    {name:'Controfiletto 7 kg+', price:16.25, unit:'cartone'},
    {name:'Controfiletto 8 kg+', price:16.50, unit:'cartone'},
    {name:'Lombo Finland 7 kg+', price:17.00, unit:'cartone'},
    {name:'Lombo Finland 8 kg+', price:17.50, unit:'cartone'},
    {name:'Costata cap on / Entrecôte', price:16.00, unit:'cartone'},
    {name:'Ribeye 3.0+', price:25.00, unit:'cartone'},
    {name:'Côte de Boeuf 5 costole', price:24.50, unit:'cartone'},
  ]},
  { id:'mountain', name:'MOUNTAIN BEEF', desc:'Simply the Best · Simmental · Halal', cuts:[
    {name:'Lomo 23+ Standard', price:14.00, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 23+ Gold', price:15.00, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 23+ Diamond', price:18.50, unit:'unità', unitLabel:'lomo (~23–25 kg)'},
    {name:'Lomo 25+ Gold', price:16.75, unit:'unità', unitLabel:'lomo (~25–27 kg)'},
    {name:'Lomo 25+ Diamond', price:20.00, unit:'unità', unitLabel:'lomo (~25–27 kg)'},
    {name:'Lomo 27+ Diamond', price:20.50, unit:'unità', unitLabel:'lomo (~27–30 kg)'},
    {name:'Lomo 30+ Diamond', price:20.75, unit:'unità', unitLabel:'lomo (~30+ kg)'},
    {name:'Lomo 30+ AAA', price:25.50, unit:'unità', unitLabel:'lomo (~30+ kg)'},
  ]},
];

const CLIENTS = {
  'sb-mf8k2':{ name:'Marco Ferretti', company:'Macelleria Ferretti', city:'Milano', type:'returning',
    habitual:[
      {brandId:'freygaard', brandName:'FREYGAARD', cutName:'Pistola Scottona Finland Standard', price:11.50, unit:'unità', unitLabel:'pistola (~65 kg)', qty:5},
      {brandId:'choco', brandName:'FREYGAARD CHOCO', cutName:'Pistola Scottona Choco Standard', price:12.50, unit:'unità', unitLabel:'pistola (~65 kg)', qty:2},
      {brandId:'sashi', brandName:'SASHI', cutName:'Cuore di Scamone Diamond — Vacca', price:12.25, unit:'cartone', unitLabel:'cartoni (~18 kg)', qty:10},
      {brandId:'sashi', brandName:'SASHI', cutName:'Sottofesa Vacca', price:9.15, unit:'cartone', unitLabel:'cartoni (~18 kg)', qty:3},
      {brandId:'sashi', brandName:'SASHI', cutName:'Fesa / Topside Scottona', price:11.25, unit:'cartone', unitLabel:'cartoni (~18 kg)', qty:5},
      {brandId:'freygaard', brandName:'FREYGAARD', cutName:'8 Costole 14+ Diamond — Vacca Nordic', price:20.00, unit:'cartone', unitLabel:'cartoni (~18 kg)', qty:3},
      {brandId:'wayne', brandName:'WAYNE & WILLIS', cutName:'Controfiletto 5 kg+', price:15.00, unit:'cartone', unitLabel:'cartoni (~18 kg)', qty:2},
    ]
  },
  'sb-lb3p9':{ name:'Lucia Bianchi', company:'Bisteccheria Bianchi', city:'Torino', type:'returning',
    habitual:[
      {brandId:'sagyu', brandName:'SAGYU', cutName:'Lomo 22+ Diamond — Scottona', price:21.00, unit:'unità', unitLabel:'lomo (~23–25 kg)', qty:2},
      {brandId:'prussian', brandName:'PRUSSIAN BLACK', cutName:'Lomo 25+ Diamond', price:19.75, unit:'unità', unitLabel:'lomo (~25–27 kg)', qty:3},
      {brandId:'mountain', brandName:'MOUNTAIN BEEF', cutName:'Lomo 23+ Gold', price:15.00, unit:'unità', unitLabel:'lomo (~23–25 kg)', qty:2},
    ]
  },
  'sb-demo':{ name:'Giovanni Rossi', company:'Ristorante Rossi', city:'Roma', type:'new' },
};

function getToken(){ try{ return new URLSearchParams(window.location.search).get('client'); }catch{ return null; } }

function CutRow({ cut, onAdd }) {
  const [qty, setQty] = useState(0);
  return (
    <div style={{padding:'0.875rem 1.5rem', borderBottom:`1px solid ${C.border}`, display:'flex', alignItems:'center', gap:'12px'}}>
      <div style={{flex:1}}>
        <div style={{fontSize:'13px', color:C.text, marginBottom:'3px'}}>{cut.name}</div>
        <div style={{fontSize:'11px', color:C.muted}}>€{cut.price.toFixed(2)}/kg · {cut.unitLabel||(cut.unit==='cartone'?'cartoni (~18 kg)':'unità')}</div>
      </div>
      <div style={{display:'flex', gap:'8px', flexShrink:0, alignItems:'center'}}>
        <button onClick={()=>setQty(q=>Math.max(0,q-1))} style={{background:'none',border:`1px solid ${C.border}`,color:C.muted,width:'28px',height:'28px',cursor:'pointer',fontSize:'16px',borderRadius:'2px',fontFamily:'Georgia'}}>−</button>
        <span style={{fontSize:'14px',color:C.text,minWidth:'20px',textAlign:'center'}}>{qty}</span>
        <button onClick={()=>setQty(q=>q+1)} style={{background:'none',border:`1px solid ${C.border}`,color:C.muted,width:'28px',height:'28px',cursor:'pointer',fontSize:'16px',borderRadius:'2px',fontFamily:'Georgia'}}>+</button>
        <button onClick={()=>{if(qty>0){onAdd(cut,qty);setQty(0);}}}
          style={{background:qty>0?C.gold:'#2a2520',color:qty>0?C.bg:C.dim,border:'none',padding:'6px 14px',borderRadius:'2px',cursor:qty>0?'pointer':'default',fontSize:'11px',letterSpacing:'0.06em',textTransform:'uppercase',fontFamily:'Georgia',whiteSpace:'nowrap'}}>
          Aggiungi
        </button>
      </div>
    </div>
  );
}

function CartPanel({ cart, setCart, onConfirm, confirmed, isNew }){
  const removeFromCart = key => setCart(c => c.filter(i => i.key !== key));
  return(
    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1px',background:C.border,border:`1px solid ${C.border}`}}>
      <div style={{background:C.surface,padding:'1.75rem'}}>
        <div style={{fontSize:'11px',letterSpacing:'0.2em',textTransform:'uppercase',color:C.gold,marginBottom:'1rem'}}>{isNew?'Richiesta di prova':'Riepilogo ordine'}</div>
        {cart.length===0
          ? <div style={{color:C.dim,fontSize:'13px',fontStyle:'italic'}}>Nessun articolo aggiunto</div>
          : cart.map(item=>(
            <div key={item.key} style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'10px',paddingBottom:'10px',borderBottom:`1px solid ${C.border}`}}>
              <BrandLogo brand={item.brandName} size={28}/>
              <div style={{flex:1}}>
                <div style={{fontSize:'11px',color:C.muted,marginBottom:'1px'}}>{item.brandName}</div>
                <div style={{fontSize:'12px',color:C.text}}>{item.cutName}</div>
                <div style={{fontSize:'10px',color:C.muted}}>{item.qty} {item.unit==='cartone'?'cartoni':'unità'} · €{item.price.toFixed(2)}/kg</div>
              </div>
              <button onClick={()=>removeFromCart(item.key)}
                style={{background:'none',border:`1px solid #3a2020`,color:'#8a5050',cursor:'pointer',fontSize:'14px',lineHeight:1,width:'24px',height:'24px',borderRadius:'2px',flexShrink:0}}>×</button>
            </div>
          ))
        }
      </div>
      <div style={{background:C.surface,padding:'1.75rem',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
        <div style={{fontSize:'13px',color:confirmed?C.green:C.muted,lineHeight:1.8}}>
          {confirmed?'✓ Richiesta inviata a David via WhatsApp'
            :isNew?'Componi il tuo ordine di prova. David ti contatterà entro 2 ore lavorative.'
            :'Il tuo ordine verrà inviato a David via WhatsApp. Conferma entro 2 ore lavorative.'}
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'10px',marginTop:'1.5rem'}}>
          <button onClick={onConfirm} disabled={cart.length===0||confirmed}
            style={{background:cart.length>0&&!confirmed?C.gold:'#2a2520',color:cart.length>0&&!confirmed?C.bg:C.dim,border:'none',padding:'14px',borderRadius:'2px',cursor:cart.length>0&&!confirmed?'pointer':'default',fontSize:'12px',letterSpacing:'0.12em',textTransform:'uppercase',fontFamily:'Georgia, serif',fontWeight:'bold'}}>
            {isNew?'Invia richiesta di prova':'Conferma ordine'}
          </button>
          <a href="https://wa.me/34694204152" target="_blank" rel="noreferrer" style={{display:'block',textAlign:'center',background:'none',border:`1px solid ${C.border}`,color:C.muted,padding:'12px',borderRadius:'2px',fontSize:'12px',letterSpacing:'0.08em',textTransform:'uppercase',textDecoration:'none',fontFamily:'Georgia, serif'}}>
            💬 Contatta David
          </a>
        </div>
      </div>
    </div>
  );
}

function NewClientView({ client, cart, setCart, onConfirm, confirmed }){
  const [activeBrand, setActiveBrand] = useState(null);
  const addToCart=(cut,qty)=>{
    const key=`${activeBrand.id}::${cut.name}`;
    setCart(c=>{const ex=c.find(i=>i.key===key);return ex?c.map(i=>i.key===key?{...i,qty:i.qty+qty}:i):[...c,{key,brandId:activeBrand.id,brandName:activeBrand.name,cutName:cut.name,price:cut.price,unit:cut.unit,unitLabel:cut.unitLabel||(cut.unit==='cartone'?'cartoni':'unità'),qty}];});
  };
  return(
    <div style={{maxWidth:'980px',margin:'0 auto',padding:'2rem 1.5rem'}}>
      <div style={{background:C.surface,border:`1px solid ${C.border}`,padding:'1.75rem',marginBottom:'2.5rem'}}>
        <div style={{fontSize:'11px',letterSpacing:'0.2em',textTransform:'uppercase',color:C.muted,marginBottom:'8px'}}>Benvenuto</div>
        <div style={{fontSize:'22px',color:C.text,marginBottom:'6px'}}>{client.name}</div>
        <div style={{fontSize:'13px',color:C.muted,lineHeight:1.7,maxWidth:'560px'}}>
          Esplora la nostra collezione e componi il tuo primo ordine di prova. Nessun impegno — ti contatteremo per confermare disponibilità e condizioni.
        </div>
      </div>
      <div style={{marginBottom:'2rem'}}>
        <div style={{fontSize:'11px',letterSpacing:'0.2em',textTransform:'uppercase',color:C.gold,marginBottom:'1.25rem'}}>La Collezione — Scegli una marca</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))',gap:'12px'}}>
          {BRANDS.map(brand=>(
            <BrandCard key={brand.id} brand={brand} active={activeBrand?.id===brand.id} onClick={()=>setActiveBrand(activeBrand?.id===brand.id?null:brand)}/>
          ))}
        </div>
      </div>
      {activeBrand&&(
        <div style={{marginBottom:'2rem',border:`1px solid ${C.gold}55`,background:'#0f0d08',borderRadius:'4px'}}>
          <div style={{padding:'1.25rem 1.5rem',borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',gap:'16px'}}>
            <BrandLogo brand={activeBrand.name} size={48}/>
            <div>
              <div style={{fontSize:'15px',color:C.gold,marginBottom:'3px'}}>{activeBrand.name}</div>
              <div style={{fontSize:'11px',color:C.muted}}>{activeBrand.desc}</div>
            </div>
          </div>
          {activeBrand.cuts.map((cut,i)=>(
            <CutRow key={i} cut={cut} onAdd={addToCart}/>
          ))}
        </div>
      )}
      <CartPanel cart={cart} setCart={setCart} onConfirm={onConfirm} confirmed={confirmed} isNew={true}/>
    </div>
  );
}

function ReturningClientView({ client, cart, setCart, onConfirm, confirmed }){
  const [habCart,setHabCart]=useState(client.habitual.map(h=>({...h,key:`${h.brandId}::${h.cutName}`})));
  const [showCatalog,setShowCatalog]=useState(false);
  const [activeBrand,setActiveBrand]=useState(null);
  useEffect(()=>{setCart(habCart);},[]);
  const updateQty=(key,val)=>{
    const v=Math.max(0,parseInt(val)||0);
    const updated=habCart.map(i=>i.key===key?{...i,qty:v}:i);
    setHabCart(updated); setCart(updated.filter(i=>i.qty>0));
  };
  const removeHab=(key)=>{
    const updated=habCart.filter(i=>i.key!==key);
    setHabCart(updated); setCart(updated.filter(i=>i.qty>0));
  };
  const addFromCatalog=(cut,qty)=>{
    const key=`${activeBrand.id}::${cut.name}`;
    const newItem={key,brandId:activeBrand.id,brandName:activeBrand.name,cutName:cut.name,price:cut.price,unit:cut.unit,unitLabel:cut.unitLabel||(cut.unit==='cartone'?'cartoni':'unità'),qty};
    const existsInHab=habCart.find(i=>i.key===key);
    if(existsInHab){
      const updated=habCart.map(i=>i.key===key?{...i,qty:i.qty+qty}:i);
      setHabCart(updated); setCart(updated.filter(i=>i.qty>0));
    } else {
      const updated=[...habCart,newItem];
      setHabCart(updated); setCart(updated.filter(i=>i.qty>0));
    }
  };
  return(
    <div style={{maxWidth:'980px',margin:'0 auto',padding:'2rem 1.5rem'}}>
      <div style={{marginBottom:'2rem'}}>
        <div style={{fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:C.muted,marginBottom:'6px'}}>Bentornato</div>
        <div style={{fontSize:'22px',color:C.text}}>{client.name}</div>
        <div style={{fontSize:'13px',color:C.muted}}>{client.city}</div>
      </div>
      <div style={{border:`1px solid ${C.border}`,background:C.surface,marginBottom:'2rem',borderRadius:'4px'}}>
        <div style={{padding:'1rem 1.5rem',borderBottom:`1px solid ${C.border}`,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{fontSize:'11px',letterSpacing:'0.2em',textTransform:'uppercase',color:C.gold}}>I tuoi prodotti abituali</div>
          <div style={{fontSize:'11px',color:C.muted}}>− + per quantità · × per rimuovere</div>
        </div>
        {habCart.length===0 && <div style={{padding:'1.5rem',color:C.dim,fontSize:'13px',fontStyle:'italic'}}>Nessun articolo — aggiungi dal catalogo</div>}
        {habCart.map(item=>(
          <div key={item.key} style={{padding:'0.875rem 1.5rem',borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',gap:'12px',opacity:item.qty===0?0.35:1,transition:'opacity 0.2s'}}>
            <BrandLogo brand={item.brandName} size={40}/>
            <div style={{flex:1}}>
              <div style={{fontSize:'11px',color:C.muted,marginBottom:'2px'}}>{item.brandName}</div>
              <div style={{fontSize:'13px',color:item.qty===0?C.dim:C.text,textDecoration:item.qty===0?'line-through':'none'}}>{item.cutName}</div>
              <div style={{fontSize:'10px',color:C.muted,marginTop:'2px'}}>€{item.price.toFixed(2)}/kg · {item.unitLabel}</div>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:'8px',flexShrink:0}}>
              <button onClick={()=>updateQty(item.key,item.qty-1)} style={{background:'none',border:`1px solid ${C.border}`,color:C.muted,width:'28px',height:'28px',cursor:'pointer',fontSize:'16px',borderRadius:'2px',fontFamily:'Georgia'}}>−</button>
              <span style={{fontSize:'15px',color:C.text,minWidth:'24px',textAlign:'center'}}>{item.qty}</span>
              <button onClick={()=>updateQty(item.key,item.qty+1)} style={{background:'none',border:`1px solid ${C.border}`,color:C.muted,width:'28px',height:'28px',cursor:'pointer',fontSize:'16px',borderRadius:'2px',fontFamily:'Georgia'}}>+</button>
              <span style={{fontSize:'10px',color:C.muted,minWidth:'44px'}}>{item.unit==='cartone'?'cartoni':'unità'}</span>
              <button onClick={()=>removeHab(item.key)}
                style={{background:'none',border:`1px solid #3a2020`,color:'#8a5050',width:'26px',height:'26px',cursor:'pointer',fontSize:'14px',borderRadius:'2px',flexShrink:0}}>×</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginBottom:'2rem'}}>
        <button onClick={()=>setShowCatalog(!showCatalog)}
          style={{background:'none',border:`1px solid ${C.border}`,color:C.muted,padding:'12px 20px',borderRadius:'4px',cursor:'pointer',fontSize:'12px',letterSpacing:'0.08em',textTransform:'uppercase',fontFamily:'Georgia, serif',width:'100%'}}>
          {showCatalog?'▲ Chiudi catalogo':'▼ Vuoi aggiungere qualcosa? Esplora il catalogo completo'}
        </button>
        {showCatalog&&(
          <div style={{marginTop:'12px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(120px,1fr))',gap:'10px',marginBottom:'16px'}}>
              {BRANDS.map(brand=>(
                <BrandCard key={brand.id} brand={brand} active={activeBrand?.id===brand.id} onClick={()=>setActiveBrand(activeBrand?.id===brand.id?null:brand)}/>
              ))}
            </div>
            {activeBrand&&(
              <div style={{border:`1px solid ${C.gold}55`,background:'#0f0d08',borderRadius:'4px'}}>
                <div style={{padding:'1rem 1.5rem',borderBottom:`1px solid ${C.border}`,display:'flex',alignItems:'center',gap:'12px'}}>
                  <BrandLogo brand={activeBrand.name} size={40}/>
                  <div style={{fontSize:'13px',color:C.gold}}>{activeBrand.name}</div>
                </div>
                {activeBrand.cuts.map((cut,i)=>(
                  <CutRow key={i} cut={cut} onAdd={addFromCatalog}/>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
      <CartPanel cart={cart} setCart={setCart} onConfirm={onConfirm} confirmed={confirmed} isNew={false}/>
    </div>
  );
}

function AdminPanel({ onEnter }){
  const [copied,setCopied]=useState(null);
  const base=window.location.href.split('?')[0];
  const copy=token=>{navigator.clipboard.writeText(`${base}?client=${token}`).then(()=>{setCopied(token);setTimeout(()=>setCopied(null),2000);});};
  return(
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem'}}>
      <div style={{width:'100%',maxWidth:'660px'}}>
        <div style={{textAlign:'center',marginBottom:'2.5rem'}}>
          <div style={{fontSize:'11px',letterSpacing:'0.25em',textTransform:'uppercase',color:C.gold,marginBottom:'10px'}}>JN Meat International</div>
          <div style={{fontSize:'32px',color:C.text}}>Sashi Beef</div>
          <div style={{width:'32px',height:'1px',background:C.gold,margin:'16px auto'}}/>
          <div style={{fontSize:'11px',letterSpacing:'0.15em',textTransform:'uppercase',color:C.muted}}>Generatore link clienti</div>
        </div>
        <div style={{border:`1px solid ${C.border}`,background:C.surface,borderRadius:'4px'}}>
          <div style={{padding:'1rem 1.5rem',borderBottom:`1px solid ${C.border}`}}>
            <div style={{fontSize:'10px',letterSpacing:'0.15em',textTransform:'uppercase',color:C.gold}}>Link personalizzati</div>
          </div>
          {Object.entries(CLIENTS).map(([token,c],i,arr)=>(
            <div key={token} style={{padding:'1rem 1.5rem',borderBottom:i<arr.length-1?`1px solid ${C.border}`:'none',display:'flex',alignItems:'center',justifyContent:'space-between',gap:'12px'}}>
              <div style={{flex:1}}>
                <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'3px'}}>
                  <div style={{fontSize:'14px',color:C.text}}>{c.name}</div>
                  <span style={{fontSize:'9px',letterSpacing:'0.08em',textTransform:'uppercase',color:c.type==='returning'?C.green:C.gold,background:c.type==='returning'?C.greenBg:'#1a1200',border:`1px solid ${c.type==='returning'?C.greenBorder:C.gold+'33'}`,padding:'2px 6px',borderRadius:'2px'}}>{c.type==='returning'?'Abituale':'Nuovo'}</span>
                </div>
                <div style={{fontSize:'11px',color:C.muted}}>{c.company} · {c.city}</div>
                <div style={{fontSize:'10px',color:C.dim,marginTop:'3px',fontFamily:'monospace'}}>?client={token}</div>
              </div>
              <div style={{display:'flex',gap:'8px',flexShrink:0}}>
                <button onClick={()=>copy(token)} style={{background:copied===token?C.greenBg:'none',border:`1px solid ${copied===token?C.greenBorder:C.border}`,color:copied===token?C.green:C.muted,padding:'6px 14px',borderRadius:'2px',cursor:'pointer',fontSize:'11px',letterSpacing:'0.06em',textTransform:'uppercase',fontFamily:'Georgia',whiteSpace:'nowrap'}}>
                  {copied===token?'✓ Copiato':'Copia link'}
                </button>
                <button onClick={()=>onEnter(token)} style={{background:'none',border:`1px solid ${C.gold}44`,color:C.gold,padding:'6px 14px',borderRadius:'2px',cursor:'pointer',fontSize:'11px',letterSpacing:'0.06em',textTransform:'uppercase',fontFamily:'Georgia',whiteSpace:'nowrap'}}>Apri →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App(){
  const [view,setView]=useState(null);
  const [cart,setCart]=useState([]);
  const [confirmed,setConfirmed]=useState(false);
  const [lang,setLang]=useState('IT');
  useEffect(()=>{const t=getToken();setView(t&&CLIENTS[t]?t:'admin');},[]);
  const handleConfirm=()=>{if(cart.length===0||confirmed)return;setConfirmed(true);setCart([]);};
  if(!view)return null;
  if(view==='admin')return <AdminPanel onEnter={setView}/>;
  const client=CLIENTS[view];
  return(
    <div>
      <div style={{background:'#0a0a0a',borderBottom:`1px solid ${C.border}`,position:'sticky',top:0,zIndex:100}}>
        <div style={{maxWidth:'980px',margin:'0 auto',padding:'0 1.5rem',height:'52px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div style={{display:'flex',alignItems:'center',gap:'12px'}}>
            <span style={{fontSize:'15px',letterSpacing:'0.06em',color:C.gold}}>Sashi Beef</span>
            <span style={{color:C.border}}>|</span>
            <span style={{fontSize:'12px',color:C.muted}}>{client.company}</span>
          </div>
          <div style={{display:'flex',gap:'8px'}}>
            {['IT','EN'].map(l=><button key={l} onClick={()=>setLang(l)} style={{background:'none',border:`1px solid ${l===lang?C.gold:'transparent'}`,color:l===lang?C.gold:C.muted,padding:'3px 10px',borderRadius:'2px',cursor:'pointer',fontSize:'11px',fontFamily:'Georgia'}}>{l}</button>)}
          </div>
        </div>
      </div>
      {client.type==='new'
        ?<NewClientView client={client} cart={cart} setCart={setCart} onConfirm={handleConfirm} confirmed={confirmed}/>
        :<ReturningClientView client={client} cart={cart} setCart={setCart} onConfirm={handleConfirm} confirmed={confirmed}/>
      }
    </div>
  );
}
