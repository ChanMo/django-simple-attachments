tinymce.init({
  selector:'.richtext',
  height: 600,
  language: 'zh_CN',
  language_url: '/static/attachments/widgets/zh_CN.js',
  plugins: 'image lists autolink fullscreen table media',
  menubar: false,
  toolbar: 'styleselect | bold italic forecolor backcolor | alignleft aligncenter alignright | numlist bullist | image media table | fullscreen',
  images_upload_handler: async function (blobInfo, success, failure) {
    const data = {'source':blobInfo.base64()}
    fetch('/api/attachments/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCookie('csrftoken'),
      },
      mode: 'cors',
      cache: 'default',
      body: JSON.stringify(data)
    }).then((res)=>{
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    }).then(res => {
      success(res.source)
    }).catch(err => failure(err))
  }
})

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
