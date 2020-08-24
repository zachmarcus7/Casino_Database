
for i in `ls *js`
do
    sed -i "s/let port =.*/let port = $1;/" $i
done
