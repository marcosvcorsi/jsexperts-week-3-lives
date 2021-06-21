# formata o resultado
curl \
  --silent \
  https://parallelum.com.br/fipe/api/v1/carros/marcas \
  | jq

# renomeia as propriedades e converte para json
curl \
  --silent \
  https://parallelum.com.br/fipe/api/v1/carros/marcas \
  | jq '[.[] | {marca: .nome, id: .codigo}]'

# joga para um arquivo
curl \
  --silent \
  https://parallelum.com.br/fipe/api/v1/carros/marcas \
  | jq '[.[] | {marca: .nome, id: .codigo}]' \
  | tee data.json

# encontra os arquivos
find . -name '*.js' -or -name '*.mjs'

# mostra a quantidade de linhas
wc -l data.json

# passa o argumento para o pipe
ls | xargs wc -l

# Examples
# exibe conteudo
find . -name '*.js' -or -name '*.mjs' | xargs cat
# primeira linha
find . -name '*.js' -or -name '*.mjs' | xargs head -n 1 

# working directory
pwd

for file in `find . -name '*.json'`
do
  cat $file
done

# Remover node_modules
# npkill
find . -name 'node_modules' -type d -exec rm -rf '{}' +
