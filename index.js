
const path = require('path');
const http = require('http');

//تعيين الدليل العام
app.use(express.static(path.join(__dirname, 'public')));


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));